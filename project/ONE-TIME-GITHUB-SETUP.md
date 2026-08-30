# One-Time GitHub Setup Items

Status: human/UI configuration backlog

These are native GitHub controls that are useful to the VaultOS development system but are not currently exposed as writable operations through the connected integration.

## Main branch protection / ruleset

Target intent:

- prevent deletion of `main`;
- require pull request review before merge once collaborative development begins;
- require selected Actions checks after those checks are stable;
- prevent bypass of failing required checks except through an explicit emergency governance path;
- preserve linear/legible history where practical;
- avoid enabling a required check until the check itself has demonstrated reliable behavior.

Current observed state at initial setup: `main` was not protected and no repository rulesets existed.

## GitHub Project

Target intent:

Create views/fields for Work Box, Status, Revision, Evidence Status, Verification Status, Priority, Severity, Reversibility, Architecture Impact, and Descendant Disposition. The repository remains source of truth; the Project is a work-state projection.

## Security/procurement features

When implementation dependencies exist, enable/configure the applicable free public-repository features such as dependency graph, Dependabot, dependency review, and code scanning. Their findings feed issue/evidence/Gauntlet intake; they do not automatically become diagnosis or architecture.

## Releases and attestations

Do not publish an R1 baseline release until R1 is coherently test-ready. When executable artifacts exist, connect releases to source revision, test generation, evidence, hashes, and artifact provenance.

## Deployment environments

Create environment gates only when real deployment targets exist. Do not invent production/staging authority before there is something real to deploy.

## Activation rule

Native controls are enabled only after their dependent workflow/check has proven reliable enough that enforcing it will not create a self-inflicted lockout or false governance signal.
