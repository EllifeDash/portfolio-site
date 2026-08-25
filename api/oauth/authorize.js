module.exports = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || "Ov23lifw9Lwf5o8N8IOO";
  const redirectUri = "https://abdullahtayyab.dev/api/oauth/callback";
  const scope = (new URL(req.url, "https://abdullahtayyab.dev").searchParams.get("scope")) || "repo";
  const state = require("crypto").randomBytes(16).toString("hex");

  res.setHeader(
    "Set-Cookie",
    `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/`
  );

  const url =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
      state,
    }).toString();

  res.writeHead(302, { Location: url });
  res.end();
};
