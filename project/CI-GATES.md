# CI Gate Classes

Status: operational design

## Gate classes

### Structure Gate
Confirms required repository structure, governing documents, and schemas exist.

### Contract Gate
Confirms a proposed change identifies the behavioral contract or invariant it affects when applicable.

### Evidence Gate
Confirms consequential claims reference appropriate evidence/provenance rather than relying on assertion alone.

### Regression Gate
Confirms previously validated behavior has not been silently broken under the current test generation.

### Security/Procurement Gate
Confirms new dependencies and externally sourced components are reviewable and have not bypassed dependency/security intake.

### Gauntlet Gate
Confirms the independent challenge suite has completed for changes that require it. This gate belongs to the independent test lineage, not to any R revision.

### Release Gate
Confirms source, artifact, test identity, provenance, rollback target, and authorization are coherent before release/deployment.

## Result vocabulary

PASS: declared gate conditions satisfied.

FAIL: declared gate conditions falsified.

UNCERTAIN: insufficient evidence or ambiguous state.

BLOCKED: required dependency/gate did not execute or is unavailable.

A missing gate is not equivalent to PASS.
