# VaultOS R1 Build Test Contract

Status: executable test-substrate contract
Scope: R1 implementation packages presented for governed evaluation

## Purpose

This contract defines the smallest machine-readable boundary needed to run an R1 implementation candidate through GitHub-hosted deterministic checks without promoting test machinery into architecture authority.

The test substrate evaluates a build against declared R1 expectations. It does not make the implementation authoritative, does not promote architecture, and does not make a successful workflow equivalent to verified capability.

## Candidate location

The default candidate directory is `r1-build/`.

A candidate SHALL contain `r1-build/manifest.json`. The manifest is an implementation/evaluation interchange record, not a permanent VaultOS architecture primitive.

## Required manifest fields

```json
{
  "schema": "vaultos.r1.build.v1",
  "architecture_revision": "R1",
  "build_id": "...",
  "source_commit": "...",
  "components": [
    {"id": "...", "path": "relative/path", "role": "...", "sha256": "optional"}
  ],
  "authority_boundaries": {
    "user_authority_preserved": true,
    "generator_is_sole_evaluator": false,
    "execution_equals_success": false
  },
  "verification": {
    "expected_behavior_refs": ["..."],
    "independent_evaluator_required": true,
    "rollback_ref": "..."
  }
}
```

## Deterministic gate

The initial harness SHALL check at least:

1. manifest existence and JSON validity;
2. schema identity and `architecture_revision == R1`;
3. non-empty build and source identity;
4. at least one declared component;
5. unique component IDs;
6. every component path remains inside the candidate directory;
7. every declared component path exists;
8. declared SHA-256 digests match when supplied;
9. user authority remains explicitly preserved;
10. the generator is not declared sole evaluator;
11. execution is not declared equivalent to success;
12. expected-behavior references exist;
13. independent evaluation is required for this R1 substrate;
14. a rollback/rejection reference is declared.

## Result vocabulary

- `PASS`: all deterministic checks in this generation passed.
- `FAIL`: one or more deterministic claims were falsified.
- `BLOCKED`: no candidate or required substrate was available to evaluate.
- `UNCERTAIN`: reserved for cases where the harness can execute but evidence is insufficient for a conclusive deterministic result.

A `PASS` means only that this test generation passed. It does not mean architecture promotion, production readiness, deployment authorization, or total capability verification.

## Evidence

Every evaluation SHOULD preserve:

- architecture revision;
- implementation build identity;
- source commit;
- harness generation;
- repository commit that executed the harness;
- per-check result and message;
- manifest digest;
- component digests where declared;
- workflow/run provenance when executed in GitHub Actions;
- final deterministic disposition.

## Extension rule

New tests should first extend this harness or its data inputs. Create a new permanent subsystem only when a distinct evaluator, execution environment, authority boundary, lifecycle, or evidence type requires it.

## Developmental rule

R1 is expected to reveal failures. The harness SHALL report failures rather than weakening checks to manufacture PASS. A newly discovered failure class should become a reproducible regression scenario when justified.
