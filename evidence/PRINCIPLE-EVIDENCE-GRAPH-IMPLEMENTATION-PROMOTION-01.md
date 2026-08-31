# Principle / Evidence Graph Implementation Promotion 01

Status: ACCEPTED DOWNSTREAM REALIZATION
Date: 2026-08-31
Architecture contract: `architecture/PRINCIPLE-EVIDENCE-GRAPH-CONTRACT-01.md`

## Custody path

`Claude workspace -> Google Drive checkpoint -> independent review -> GitHub`

This promotion follows `architecture/CUSTODY-AND-PROMOTION-PIPELINE.md`. GitHub is the downstream realization surface; the Drive checkpoints remain the evidence source for the implementation state produced and tested in the Claude workspace.

## Accepted implementation checkpoint

Drive checkpoint: `PRINCIPLE_EVIDENCE_GRAPH_IMPLEMENTATION_CHECKPOINT_01.md`
Drive ID: `1xmAhvWjNWj74w7V91P0v-_1UCH0pdTeu`
Reported clean-room result: compile PASS; 276/276 tests PASS, 0 fail; 253 prior + 23 new.
Package identity remains UNRESOLVED.

### Graph artifacts

| Repository path | Drive ID | Bytes | Upstream SHA-256 |
|---|---|---:|---|
| `src/graph/PrincipleGraph.ts` | `19djVW1RjTOvZREaf8AYcwv6LBMP32ZkU` | 3329 | `1a7acd2e1cd084a5630da03cfd1d1ad6abcf32e98a06d8b58e13012564ebc745` |
| `src/graph/EvidenceGraph.ts` | `1Mni47x2NReIOJf87uML1d5BNiCnEN405` | 2080 | `51e799e0f31eb9672864af743c8e8f39d046d8c05ee46ce6fd481ac2aa8b2a8a` |
| `test/PrincipleGraph.test.ts` | `1DTmkK88mne9nw6vcRQ0ORBdXNVTK5ZTs` | 7500 | `d1f8ecc338160b31bc94d1dcb813c27253a1db9b48b9dd5601edbf24be974308` |
| `test/EvidenceGraph.test.ts` | `1Q2mGUfrMXPomXUDhI-eYV0HuOhGtN5eI` | 3751 | `d82a8f4ee4ae861449bbbd6e3f6c88e28e8c790499cb71d8a63b96fb3ca1ed16` |

## Minimum restored dependencies

The graph files import the frozen Package 0 `Principle` and `EvidenceObject` primitives. Because those source files were not yet present in this GitHub repository, their verified Drive versions were restored as the minimum dependency slice rather than inventing substitutes.

| Repository path | Drive ID | Bytes | Upstream SHA-256 |
|---|---|---:|---|
| `src/core/Principle.ts` | `1OdAvClmWo6VgO5EZVlNzONEQ19QvaFCR` | 4870 | `6f455ccdc9d5283c316f37e9f40b228293fd1852741fb775bef990c58f9646f2` |
| `src/core/EvidenceObject.ts` | `1wwJwbAgEnif5s_5e65KgrmK-x80iQyrm` | 6019 | `68b0c8c50fc95fc42db9c203dafdc25f9b85e2ecc3d724166ca6853889d4eec3` |

The primitive checksums above are recorded in `PACKAGE_0_GROUND_TRUTH_MANIFEST.md`, Drive ID `1RpcR8lQ5kBuSzadO7vTa7x9oH8gv18YW`.

## Scope discipline

Accepted behavior remains exactly the architecture contract:

- Principle Graph: direct outgoing, incoming, and existing-relation-type filtering only.
- Evidence Graph: claim grouping and polarity filtering only.
- read-only, stateless, non-owning, caller-supplied;
- no graph mutation, persistence, truth scoring, contradiction diagnosis, transitive inference, authorization, or new global primitive.

Governing separations remain:

```text
QUERY != MUTATION
TRAVERSAL != AUTHORIZATION
RELATION != TRUTH
GRAPH CONNECTIVITY != EVIDENCE VALIDITY
GROUPING != DIAGNOSIS
```

## Verification boundary

This GitHub promotion preserves the Drive-derived text and upstream checksum identifiers. It does **not** claim that the entire Claude workspace, its build configuration, all six P0 primitives, Package 1, Package 2, or all 276 tests have yet been reconstructed in GitHub. The reported 276/276 result remains evidentiary truth from the accepted Drive checkpoint until the full executable baseline is independently reconstructed and run in a GitHub-backed environment.

Implementation truth and evidentiary truth therefore remain distinct rather than being silently conflated.
