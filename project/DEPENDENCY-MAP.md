# R1 Dependency Map

Status: operational map for GitHub Issues / Project organization

## Issue boxes

| Box | Issue | Depends on | Blocks |
|---|---|---|---|
| Baseline Definition | #1 | #10 for finalization | #2, #3, test entry |
| Observable Surface | #2 | #1, #3 | #5, #7 |
| Behavioral Contracts | #3 | #1 | #2, #7 |
| Evidence / Provenance | #4 | align #1/#2 | #5, #7, #8 |
| Evaluation / Diagnosis | #5 | #2, #4; uses #3 | #6, #8 |
| Correction / Experiment | #6 | #5; uses #3/#4 | #7 |
| Verification / Regression | #7 | #2, #3, #4; uses #6 | #8 |
| Findings / Negative Knowledge | #8 | #4, #7; uses #5 | #9 |
| Inheritance / R2 Candidate | #9 | #8 | ACP candidate / R2 delta |
| Semantic-Core Review | #10 | existing architecture review | #1 finalization |

## Primary dependency spine

```text
#10 Semantic-Core Review
  -> #1 Baseline Definition
      -> #3 Behavioral Contracts
      -> #2 Observable Surface
          + #4 Evidence / Provenance
              -> #5 Independent Evaluation / Diagnosis
                  -> #6 Correction / Experiment
                      -> #7 Verification / Regression
                          -> #8 Findings / Negative Knowledge
                              -> #9 Inheritance / R2 Candidate
                                  -> Promotion Review
                                      -> ACP only if ACP_CANDIDATE
```

The graph is intentionally not purely linear. Evidence work can proceed in parallel. Observability and contracts inform one another. Failed verification may reopen diagnosis. A correction may itself produce a new issue. A finding may remain local or experimental and never become an ACP.

## Project-field intent

When the GitHub Project surface is available to an authorized worker, map items into native/structured fields rather than encoding everything into titles.

Recommended fields:

- Work Box: Baseline | Observation | Contract | Issue | Evidence | Evaluation | Diagnosis | Correction | Experiment | Verification | Finding | Inheritance | ACP
- Status: Backlog | Ready | Active | Blocked | Review | Verify | Done | Deferred
- Revision: R1 | R2-CANDIDATE | future revision
- Evidence Status: None | Pending | Partial | Supported | Contradicted | Verified
- Severity: Informational | Low | Moderate | High | Critical
- Priority: P0 | P1 | P2 | P3
- Reversibility: Reversible | Compensatable | Irreversible
- Architecture Impact: None | Local | Candidate | Governing
- Descendant Disposition: Preserve | Correct | Refine | Discover | Collapse | Generalize | Defer | Reject

Use GitHub-native relationships for parent/sub-issue and blocked-by/blocking when supported. Do not duplicate those relationships in prose unless needed for portability or connector limitations.

## Rule

The containers precede the data. New work should fall into an existing semantic box whenever possible. Create a new box only when existing boxes destroy an important distinction or cannot represent a recurring class of work cleanly.
