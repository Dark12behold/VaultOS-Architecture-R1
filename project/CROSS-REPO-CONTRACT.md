# Cross-Repository Contract: Architecture <-> Independent Gauntlet

Status: R1 operational boundary

## Parties

Architecture lineage: `VaultOS-Architecture-R*`

Independent test lineage: `VaultOS-MAC-Gauntlet` (target repository; separate version lineage)

## Architecture exports

The architecture side MAY export:

- behavioral contracts;
- protected invariants;
- issue records;
- evidence references;
- validated findings;
- Gauntlet candidates;
- baseline/release identity;
- expected observable behavior.

## Gauntlet exports

The independent test side MAY return:

- scenario identity/version;
- test-generation identity;
- execution environment;
- MAC/Peaches/evaluator identities;
- PASS/FAIL/UNCERTAIN/BLOCKED result;
- raw evidence/artifact references;
- reproduced failure class;
- newly discovered issue candidates;
- regression status;
- historical re-test comparisons.

## Forbidden coupling

- An R revision SHALL NOT own or define the lifetime of the test lineage.
- Gauntlet evolution SHALL NOT rewrite architecture history.
- Architecture SHALL NOT silently redefine a test to convert failure into pass.
- Gauntlet SHALL NOT grant itself architecture-change authority.
- MAC SHALL NOT be its sole evaluator.
- Peaches SHALL NOT be treated as identical to Gauntlet orchestration or independent evaluation.

## Transfer identity

Every cross-repository transfer SHOULD preserve a portable source reference and immutable-enough identifiers where available: repository, revision/commit, issue/finding ID, candidate ID, scenario ID, evidence/artifact digest, and timestamps.

## Feedback rule

A discovered failure may influence architecture and future tests through two separate decisions:

1. architecture disposition: preserve/correct/refine/discover/collapse/generalize/defer/reject;
2. Gauntlet disposition: reject candidate / exploratory / scenario / regression corpus / retire with retained history.

Neither decision automatically implies the other.
