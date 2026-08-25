export default async function handler(req, res) {
  const url = new URL(req.url, "https://abdullahtayyab.dev");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookie = req.headers.cookie || "";
  const saved = (cookie.match(/oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || !saved || state !== saved) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("<h1>Invalid OAuth state</h1>");
    return;
  }

  const clientId = process.env.GITHUB_CLIENT_ID || "Ov23lifw9Lwf5o8N8IOO";
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientSecret) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Server missing GITHUB_CLIENT_SECRET</h1>");
    return;
  }

  let tokenJson;
  try {
    const r = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: "https://abdullahtayyab.dev/api/oauth/callback",
      }),
    });
    tokenJson = await r.json();
  } catch (e) {
    res.writeHead(502, { "Content-Type": "text/html" });
    res.end("<h1>Token exchange failed</h1>");
    return;
  }

  const token = tokenJson.access_token;
  if (!token) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(
      "<h1>GitHub did not return a token. Check app type/permissions.</h1>"
    );
    return;
  }

  const origin = "https://abdullahtayyab.dev";
  const payload = JSON.stringify({ token });
  const html = `<!doctype html><html><head><title>Authorizing</title></head><body>
<script>
(function () {
  var payload = ${JSON.stringify(payload)};
  function send() { window.opener.postMessage("authorizing:github", "${origin}"); }
  window.addEventListener("message", function (e) {
    if (e.origin !== "${origin}") return;
    if (e.data === "authorizing:github") {
      e.source.postMessage("authorization:github:success:" + payload, "${origin}");
      window.close();
    }
  });
  if (window.opener) { send(); } else { document.body.innerHTML = "No opener. Close this window and try again."; }
})();
</script>
</body></html>`;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
