# Metatextum Cloudflare Bootstrap

This directory is a minimal deployment/verification surface for Cloudflare Workers.

It does **not** promote or redefine Metatextum architecture. The repository's architecture, evidence, and governance records remain authoritative within their existing boundaries.

## Endpoints

- `/` identifies the lab surface.
- `/health` returns a small machine-readable health record.

## Cloudflare build configuration

Set the Cloudflare project's **root directory** to `cloudflare`.

Deployment command:

```text
npx wrangler deploy
```

The Worker name intentionally matches the Cloudflare project that was already created by the initial deployment attempt.
