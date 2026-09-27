export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        service: "metatextum-lab",
        status: "ok",
        role: "deployment-verification-surface"
      });
    }

    return new Response(
      "Metatextum Lab\n\nPrivate deployment and verification surface.\n",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }
};
