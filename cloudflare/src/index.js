const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: { "cache-control": "no-store" }
  });

const comingSoon = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Metatextum</title>
<style>
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;background:#07090b;color:#f1eee8;font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
body{overflow:hidden}
.hero{position:relative;min-height:100dvh;width:100%;overflow:hidden;background:
radial-gradient(ellipse 55% 95% at 90% 38%,rgba(239,226,202,.9) 0 1%,rgba(161,150,132,.38) 4%,rgba(51,53,52,.2) 12%,rgba(8,10,12,0) 33%),
radial-gradient(ellipse 52% 78% at 78% 54%,rgba(112,108,98,.42) 0 1%,rgba(50,52,50,.38) 25%,rgba(13,16,18,.75) 54%,rgba(6,8,10,1) 72%),
radial-gradient(ellipse 72% 90% at 76% 28%,rgba(55,57,55,.48) 0 34%,rgba(13,16,18,.7) 54%,rgba(5,7,9,1) 75%)}
.hero:before{content:"";position:absolute;width:74vw;height:74vw;min-width:760px;min-height:760px;right:-10vw;top:3vh;border-radius:50%;background:radial-gradient(circle at 70% 36%,rgba(244,231,206,.74) 0 1.2%,rgba(98,96,88,.22) 5%,rgba(27,30,31,.84) 34%,rgba(8,10,12,.98) 64%);box-shadow:inset -34px 6px 60px rgba(238,223,197,.34),inset -2px -3px 2px rgba(255,245,224,.16);opacity:.96}
.hero:after{content:"";position:absolute;width:67vw;height:67vw;right:-7vw;bottom:-43vw;border-radius:50%;background:radial-gradient(circle at 60% 20%,rgba(123,119,107,.36),rgba(40,43,42,.65) 28%,rgba(8,10,12,.98) 66%);box-shadow:inset 8px 24px 50px rgba(207,195,172,.13)}
.brand{position:absolute;z-index:3;left:19.2%;top:5.8%;font-size:clamp(11px,1.05vw,18px);letter-spacing:.38em;font-weight:500}
.copy{position:absolute;z-index:3;left:9.1%;top:29%;max-width:760px}
h1{margin:0;font-size:clamp(58px,7.15vw,116px);line-height:1.03;letter-spacing:-.055em;font-weight:350}
p{margin:34px 0 0;font-size:clamp(20px,1.85vw,31px);font-weight:300;color:rgba(240,236,229,.68);letter-spacing:-.025em}
@media(max-width:700px){.brand{left:8%;top:6%;}.copy{left:8%;top:27%;right:8%}h1{font-size:clamp(54px,15vw,82px)}p{margin-top:24px}.hero:before{right:-78vw;top:7vh}.hero:after{right:-72vw;bottom:-22vw}}
</style>
</head>
<body><main class="hero"><div class="brand">METATEXTUM</div><div class="copy"><h1>Something is<br>taking shape.</h1><p>Come back soon.</p></div></main></body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({
        service: "metatextum-lab",
        status: "ok",
        role: "deployment-verification-surface",
        r2_binding: "ARTIFACTS"
      });
    }

    if (url.pathname === "/storage/health") {
      const key = "_metatextum/health.json";
      const payload = {
        service: "metatextum-lab",
        check: "r2-read-write-delete",
        created_at: new Date().toISOString()
      };

      try {
        await env.ARTIFACTS.put(key, JSON.stringify(payload), {
          httpMetadata: { contentType: "application/json" },
          customMetadata: { purpose: "ephemeral-health-check" }
        });

        const object = await env.ARTIFACTS.get(key);
        if (!object) return json({ status: "fail", stage: "read", key }, 500);

        const recovered = await object.json();
        const verified =
          recovered.service === payload.service &&
          recovered.check === payload.check &&
          recovered.created_at === payload.created_at;

        await env.ARTIFACTS.delete(key);

        return json({
          service: "metatextum-lab",
          status: verified ? "ok" : "fail",
          storage: "r2",
          binding: "ARTIFACTS",
          operation: "write-read-verify-delete",
          verified
        }, verified ? 200 : 500);
      } catch (error) {
        return json({
          service: "metatextum-lab",
          status: "fail",
          storage: "r2",
          binding: "ARTIFACTS",
          error: error instanceof Error ? error.message : String(error)
        }, 500);
      }
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(comingSoon, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};
