const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store"
    }
  });

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
        if (!object) {
          return json({ status: "fail", stage: "read", key }, 500);
        }

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

    return new Response(
      "Metatextum Lab\n\nPrivate deployment and verification surface.\n",
      { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } }
    );
  }
};
