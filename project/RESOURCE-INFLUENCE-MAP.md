# GitHub Resource Influence Map

Status: operational map

## Purpose

Define what each GitHub resource may influence, what evidence it can produce, and what it must not become.

| Resource | Primary influence | Produces | Must not become |
|---|---|---|---|
| Repository | durable state and lineage | files, history, refs | epistemic authority |
| Issue | intake and work classification | discussion, structured problem record | proof of failure |
| Pull Request | proposed repository mutation | diff, review context | permission by existence |
| Action | repeatable process | logs, artifacts, checks | architecture authority |
| Check/status | machine result surface | pass/fail/pending context | universal truth claim |
| Ruleset | enforced repository constraint | blocked/allowed mutation | substitute for architecture reasoning |
| Release/tag | historical baseline reference | immutable-ish lineage marker and assets | proof that behavior is correct |
| Artifact | generated output | build/test evidence candidate | evidence without provenance |
| Dependency graph | supply-chain observation | dependency relationships | automatic procurement approval |
| Security finding | external challenge input | vulnerability alert/finding | automatic diagnosis |
| Project | planning projection | grouped work state | source of architectural truth |

## Influence topology

`SOURCE/ARCHITECTURE -> PR -> AUTOMATED CHECKS -> REVIEW -> MERGE -> BUILD/ARTIFACT -> RELEASE/DEPLOYMENT -> OBSERVATION -> ISSUE/FINDING -> GAUNTLET CANDIDATE / ARCHITECTURE REVIEW`

## Independence rule

No single GitHub surface may simultaneously be generator, evaluator, authorizer, and historical evidence authority for the same consequential claim.

## Resource reuse rule

Before building a VaultOS-specific service, ask whether an existing GitHub primitive can provide the generic behavior. If yes, reuse the generic behavior while preserving VaultOS semantics outside GitHub-specific assumptions.
