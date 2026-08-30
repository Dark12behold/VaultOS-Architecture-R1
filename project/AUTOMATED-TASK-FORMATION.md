# Automated Task Formation

Status: active operational structure

## Purpose

Convert repeatable triggers into structured work items without converting automation into epistemic or architecture authority.

## Formation paths

### Human or agent intake
Use structured Issue Forms for Observation, Architecture Issue, Knowledge Gap, Regression, or Gauntlet Candidate.

### Manual automation
Use the `Task Former` workflow to create a structured issue from Work Box, source reference, reason, consequence, and evidence state.

### Automatic routing
The `Issue Router` inspects newly opened structured issue titles and applies work/evidence labels. A Gauntlet-candidate label produces a transfer-boundary reminder so candidate status is not confused with promotion.

### Future machine-discovered tasks
Security findings, failed CI checks, Gauntlet results, regressions, or deployment observations MAY call the same task-forming contract once those sources exist.

## Task formation contract

Every automatically formed consequential task SHOULD contain:

- trigger/source;
- source revision/build where applicable;
- work box/class;
- reason for formation;
- consequence if unresolved;
- current evidence state;
- provenance of the automation run;
- authority ceiling;
- next dependency or verification need.

## Non-authority rule

`TASK FORMED != CLAIM PROVEN != DIAGNOSIS ESTABLISHED != CHANGE AUTHORIZED != FIX VERIFIED != ARCHITECTURE PROMOTED`

Automation creates the container and routes the work. Evidence and governance determine what the work ultimately means.
