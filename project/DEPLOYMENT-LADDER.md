# Deployment Ladder

Status: operational design

## Purpose

Deployment is a sequence of increasingly consequential state transitions, not a single upload step.

## Ladder

`LOCAL/EXPERIMENT -> CI TEST -> GAUNTLET -> CANDIDATE -> STAGING -> RELEASE -> DEPLOYED -> OBSERVED`

Each transition SHOULD preserve:

- source revision;
- build identity;
- test-generation identity;
- evaluator identity where applicable;
- evidence references;
- artifact digest;
- authorization source;
- environment identity;
- rollback target;
- observed result.

## Gates

EXPERIMENT -> CI TEST requires a reproducible starting state.

CI TEST -> GAUNTLET requires deterministic baseline checks to complete.

GAUNTLET -> CANDIDATE requires no unresolved blocking failure under the declared challenge generation.

CANDIDATE -> STAGING requires explicit authorization appropriate to consequence.

STAGING -> RELEASE requires verification of artifact/source/provenance consistency.

RELEASE -> DEPLOYED requires environment-specific authorization and rollback readiness.

DEPLOYED -> OBSERVED requires post-deployment verification; execution alone is not success.

## Historical rule

A later test generation may invalidate confidence in an older release without rewriting the historical fact that the release passed the tests available at the time.
