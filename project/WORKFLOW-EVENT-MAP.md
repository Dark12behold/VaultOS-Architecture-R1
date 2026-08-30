# Workflow Event Map

Status: operational map

| Event | Automation purpose | Allowed outputs | Authority ceiling |
|---|---|---|---|
| push to main | verify repository structure and create evidence manifest | checks, logs, artifacts | verification of declared checks only |
| pull request | evaluate proposed mutation before merge | checks, review context, artifacts | no architecture promotion |
| workflow_dispatch | form structured tasks or run bounded manual automation | issue, check, artifact | caller authorization limited to requested workflow |
| issue opened | future intake classification | labels/comments/candidate routing | work formation only |
| security/dependency finding | future procurement/Gauntlet intake | issue/candidate/evidence | risk signal, not diagnosis |
| release candidate | future release evidence gate | manifest, hashes, attestations | release readiness signal |
| deployment request | future environment-specific gate | approve/block evidence | deployment decision only within configured authority |

## Current active workflows

### Architecture Governance
Triggers on push to `main`, pull request, and manual dispatch. Verifies governing files and protected separation statements remain represented.

### Evidence Integrity
Triggers on push to `main`, pull request, and manual dispatch. Generates a SHA-256 manifest of governed repository surfaces and uploads it as a workflow artifact.

### Task Former
Manual dispatch. Creates a structured GitHub Issue with work box, source, reason, consequence, evidence state, workflow provenance, and explicit authority boundary.

## Planned once independent test repository exists

- Gauntlet candidate exporter/importer.
- Cross-repository test request dispatcher.
- Historical re-test scheduler.
- MAC/Peaches/Gauntlet result ingester.
- regression-to-issue former.
- release candidate gate.
- procurement/dependency review intake.

## Rule

New automation is added only when its trigger, inputs, outputs, failure behavior, provenance, and authority ceiling are explicit.
