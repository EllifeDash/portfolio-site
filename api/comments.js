import { Redis } from "@upstash/redis";

const USE_KV = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

// Upstash Redis (replaces the sunset Vercel KV). The Vercel Marketplace
// Upstash integration injects KV_REST_API_URL / KV_REST_API_TOKEN automatically.
const redis = USE_KV ? Redis.fromEnv() : null;

// Local-dev fallback store (Vercel uses KV; `vercel dev` without KV env uses memory).
const memStore = new Map();

async function read(key) {
  if (USE_KV) return (await redis.get(key)) ?? null;
  return memStore.get(key) ?? null;
}

async function write(key, value) {
  if (USE_KV) {
    await redis.set(key, value);
    return;
  }
  memStore.set(key, value);
}

const SLUG_RE = /^[a-z0-9-]+$/;

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

async function checkRateLimit(ip) {
  const key = `rl:${ip}`;
  const rec = (await read(key)) || { count: 0, ts: Date.now() };
  const HOUR = 3600 * 1000;
  if (Date.now() - rec.ts > HOUR) {
    rec.count = 0;
    rec.ts = Date.now();
  }
  if (rec.count >= 10) return false;
  rec.count += 1;
  await write(key, rec);
  return true;
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

export default async function handler(req, res) {
  const url = new URL(req.url, "https://abdullahtayyab.dev");

  // GET /api/comments?slug=... -> approved comments (or all, if admin)
  if (req.method === "GET") {
    const slug = url.searchParams.get("slug") || "";
    if (!SLUG_RE.test(slug)) return json(res, 400, { error: "invalid slug" });
    const all = (await read(`comments:${slug}`)) || [];
    const isAdmin =
      url.searchParams.get("moderate") &&
      req.headers["x-admin-token"] === process.env.ADMIN_TOKEN;
    const out = isAdmin
      ? all.sort((a, b) => b.created_at - a.created_at)
      : all
          .filter((c) => c.approved)
          .sort((a, b) => a.created_at - b.created_at);
    return json(res, 200, out);
  }

  // PATCH /api/comments?moderate=1 -> admin approve/delete (requires ADMIN_TOKEN)
  if (req.method === "PATCH" || url.searchParams.get("moderate")) {
    const token = req.headers["x-admin-token"];
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return json(res, 401, { error: "unauthorized" });
    }
    const { slug, id, action } = await readBody(req);
    if (!SLUG_RE.test(slug)) return json(res, 400, { error: "invalid slug" });
    const all = (await read(`comments:${slug}`)) || [];
    if (action === "approve") {
      const c = all.find((x) => x.id === id);
      if (c) c.approved = true;
    } else if (action === "delete") {
      const idx = all.findIndex((x) => x.id === id);
      if (idx >= 0) all.splice(idx, 1);
    } else {
      return json(res, 400, { error: "invalid action" });
    }
    await write(`comments:${slug}`, all);
    return json(res, 200, { ok: true });
  }

  // POST /api/comments -> submit (held for moderation)
  if (req.method === "POST") {
    const ip = clientIp(req);
    const { slug, name, body, website } = await readBody(req);

    if (!SLUG_RE.test(slug || "")) {
      return json(res, 400, { error: "invalid slug" });
    }
    // Honeypot: real users never fill this hidden field.
    if (typeof website === "string" && website.length > 0) {
      return json(res, 202, { ok: true });
    }
    const cleanName = String(name || "").trim().slice(0, 50);
    const cleanBody = String(body || "").trim().slice(0, 2000);
    if (!cleanName || !cleanBody) {
      return json(res, 400, { error: "name and comment are required" });
    }
    if (!(await checkRateLimit(ip))) {
      return json(res, 429, { error: "too many comments, slow down" });
    }

    const comment = {
      id: crypto.randomUUID(),
      slug,
      name: cleanName,
      body: cleanBody,
      created_at: Date.now(),
      approved: false,
    };
    const all = (await read(`comments:${slug}`)) || [];
    all.push(comment);
    await write(`comments:${slug}`, all);

    return json(res, 202, { ok: true });
  }

  return json(res, 405, { error: "method not allowed" });
}
