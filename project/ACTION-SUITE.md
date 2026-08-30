# VaultOS GitHub Action Suite

Status: R1 operational structure
Scope: GitHub-native build, verification, evidence, procurement, release, and cross-repository coordination

## Purpose

GitHub is used as an external operating surface around VaultOS development. It is not the architecture itself. It provides durable lineage, automation, challenge intake, evidence production, proposal review, and release/deployment control.

## Operating chain

`INTAKE -> CLASSIFY -> PROPOSE -> REVIEW -> CHECK -> TEST -> EVALUATE -> EVIDENCE -> MERGE/REJECT -> RELEASE -> DEPLOY -> OBSERVE -> FEEDBACK`

## Native GitHub resources

- Issues: observations, defects, work items, findings, knowledge gaps, Gauntlet candidates.
- Pull Requests: proposed mutations to repository state.
- Actions: repeatable automation and evidence-producing workflows.
- Checks/statuses: machine-readable pass/fail/uncertain surfaces.
- Rulesets/branch protection: machine-enforced constraints where connector/UI support permits.
- Releases/tags: historical baselines and milestone references.
- Artifacts: build/test evidence outputs.
- Dependency graph/security tooling: procurement and vulnerability inputs.
- Projects: planning views and structured work-state projections.

## Authority boundaries

GitHub automation MAY observe, lint, test, classify, compare, package, and report.

GitHub automation SHALL NOT silently convert:

- observation into interpretation;
- issue into failure;
- proposal into authorization;
- implementation into verification;
- successful experiment into architecture;
- model confidence into evidence.

## Cross-repository model

Architecture revisions and the independent MAC/Peaches/Gauntlet test lineage remain separate. A validated issue may generate a portable Gauntlet candidate, but the test repository owns the challenge after transfer.

## Automation maturity

1. STRUCTURED: containers/templates exist.
2. OBSERVABLE: workflows emit repeatable checks.
3. GOVERNED: merge/release gates depend on checks.
4. PROVENANCED: artifacts, hashes, evidence, and source links are preserved.
5. ADAPTIVE: findings automatically create bounded candidate work without granting themselves authority.

## Core rule

Automation should eliminate repetitive coordination, not eliminate epistemic or human governance boundaries.
