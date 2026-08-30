# Agent Feedback Loops

Status: operational control design

## Purpose

Define how each agent/tool group receives inputs, reasons within its own role, emits bounded outputs, and feeds the next group without collapsing authority boundaries.

The system is event-driven rather than conversation-driven. Human or agent input becomes a typed work event. Each group consumes only the fields it needs and returns a structured response that can be inspected, scheduled, retried, challenged, or rejected.

## Common response envelope

Every agent-group response SHOULD contain:

- event_id
- source_group
- target_group
- source_refs
- requested_action
- observed_state
- interpretation
- confidence_basis
- uncertainty
- constraints
- authority_required
- proposed_action
- expected_result
- verification_method
- deadline_or_window
- escalation_condition
- evidence_refs
- status

Allowed status values:

`RECEIVED | NEEDS_INPUT | PROPOSED | READY | BLOCKED | EXECUTING | VERIFYING | PASS | FAIL | UNCERTAIN | DEFERRED | ESCALATED`

A response status is not permission. Authorization remains a separate event.

## Group A — Intake / Task Former

Role: convert raw human, issue, workflow, dependency, or agent signals into typed work without deciding architecture truth.

Inputs:
- human request;
- issue event;
- failed check;
- dependency/security alert;
- Gauntlet result;
- scheduled review;
- repository state change.

Logic:
1. Identify source and event type.
2. Preserve original wording/reference.
3. Classify work box and consequence.
4. Identify required downstream groups.
5. Determine whether a timeline constraint exists.
6. Form a task record or return NEEDS_INPUT.

Outputs:
- typed task;
- routing targets;
- priority/severity candidate;
- timeline input;
- evidence/provenance refs.

May not:
- declare architecture change valid;
- convert confidence into evidence;
- authorize deployment.

## Group B — Architecture / Contract

Role: determine what must remain true and whether the request fits existing architecture, requires clarification, or creates an architecture candidate.

Logic:
1. Read governing baseline and relevant contracts.
2. Compare requested behavior to current architectural truth.
3. Reuse, merge, extend, or identify unresolved gap.
4. Separate current requirement from proposed change.
5. Emit explicit protected invariants and test obligations.

Primary responses:
- FITS_CURRENT_ARCHITECTURE;
- CONTRACT_CLARIFICATION;
- ARCHITECTURE_GAP;
- ACP_CANDIDATE;
- REJECTED_BY_INVARIANT;
- NEEDS_EVIDENCE.

Output goes to implementation/task planning, evaluator, or governance review as appropriate.

## Group C — Implementation / Build

Role: realize authorized behavior with the smallest justified implementation delta.

Logic:
1. Accept only an authorized implementation target or bounded experiment.
2. Identify affected files/components/dependencies.
3. Check procurement implications.
4. Plan reversible steps.
5. Build/propose change.
6. Emit implementation trace and claimed outcomes without self-verifying them.

Responses:
- BUILD_PLAN;
- DEPENDENCY_REQUEST;
- IMPLEMENTED;
- BLOCKED;
- EXPERIMENT_READY;
- ROLLBACK_READY.

Implementation never emits VERIFIED for its own consequential claim.

## Group D — Procurement / Dependency Gate

Role: evaluate external packages, services, models, actions, containers, and tools before adoption.

Logic:
1. Identify requested capability, not merely requested product.
2. Search existing capability for reuse.
3. Record candidate supplier/resource.
4. Evaluate provenance, license, vulnerability, maintenance, availability, cost, reversibility, lock-in, and alternatives.
5. Return accept/reject/conditional recommendation.

Responses:
- REUSE_EXISTING;
- ACCEPT_CANDIDATE;
- ACCEPT_WITH_CONDITIONS;
- SUBSTITUTE;
- REJECT;
- NEEDS_SECURITY_REVIEW.

Every accepted external resource creates a future re-evaluation trigger when its risk or availability changes.

## Group E — Peaches / Guardian

Role: challenge authority, safety, containment, abuse, boundary, and resilience assumptions.

Peaches is not the final evaluator and does not become architecture authority.

Logic:
1. Identify protected asset/boundary.
2. Identify requested authority and actual authority.
3. Search for unsafe shortcuts, escalation paths, leakage, irreversible effects, and containment gaps.
4. Generate bounded challenge conditions.
5. Route reusable lessons to the Gauntlet candidate queue.

Responses:
- GUARD_CLEAR;
- CONTAINMENT_REQUIRED;
- AUTHORITY_MISMATCH;
- CHALLENGE_REQUIRED;
- GAUNTLET_CANDIDATE;
- BLOCK_PENDING_REVIEW.

## Group F — Gauntlet / Challenge Orchestrator

Role: execute versioned challenge scenarios independently of R-build lineage.

Logic:
1. Resolve target build and test generation.
2. Select applicable scenario corpus.
3. Freeze fixture/environment references.
4. Execute challenges.
5. Preserve raw outputs.
6. Send outputs to evaluator rather than self-declaring success.

Responses:
- RUN_READY;
- RUNNING;
- RUN_COMPLETE;
- SCENARIO_GAP;
- ENVIRONMENT_BLOCKED;
- RETEST_REQUIRED.

## Group G — Independent Evaluator

Role: judge evidence against expected behavior and falsification conditions.

Logic:
1. Receive contract/expected behavior independently of generator claims.
2. Inspect raw evidence and execution conditions.
3. Compare expected vs actual.
4. Consider uncertainty/confounders.
5. Emit PASS, FAIL, or UNCERTAIN with basis.
6. Route failures or new discoveries into issue/finding formation.

Responses:
- PASS;
- FAIL;
- UNCERTAIN;
- INVALID_TEST;
- INSUFFICIENT_EVIDENCE;
- NEW_FAILURE_CLASS.

Generator != Evaluator.

## Group H — Evidence / Provenance

Role: preserve what happened, how it was measured, and what artifacts support the claim.

Logic:
1. Capture source, time, producer, method, version, hash, dependencies, and environment.
2. Separate observation from interpretation.
3. Preserve contradictory evidence.
4. Create immutable or append-only references where practical.
5. Feed evidence status to evaluator and release gates.

Responses:
- EVIDENCE_ACCEPTED;
- EVIDENCE_PARTIAL;
- PROVENANCE_GAP;
- CONTRADICTION_FOUND;
- HASH_MISMATCH;
- EVIDENCE_INVALID.

## Group I — Release / Deployment

Role: move a verified artifact through staged execution boundaries without confusing build success with authorization.

Logic:
1. Require declared target environment.
2. Require required checks/evidence.
3. Confirm artifact identity/provenance.
4. Confirm authorization and rollback path.
5. Deploy to the smallest required scope.
6. Verify deployed state.

Responses:
- RELEASE_CANDIDATE;
- READY_FOR_AUTHORIZATION;
- DEPLOYING;
- DEPLOYED_UNVERIFIED;
- DEPLOYED_VERIFIED;
- ROLLBACK;
- BLOCKED.

## Group J — Human Governance

Role: exercise user ownership and explicit authority where required.

Human governance can authorize, reject, defer, reprioritize, or redefine intent. It does not make an empirical claim true merely by approving it.

Typical responses:
- AUTHORIZE;
- REJECT;
- DEFER;
- CHANGE_INTENT;
- REQUIRE_MORE_EVIDENCE;
- OVERRIDE_WITH_RECORDED_RISK.

## Closed feedback loop

`INPUT -> TASK FORMER -> ROLE ROUTING -> PROPOSAL/BUILD -> PEACHES/GAUNTLET -> EVALUATOR -> EVIDENCE -> ISSUE/FINDING -> ARCHITECTURE OR LOCAL CORRECTION -> RETEST -> RELEASE/DEPLOY -> OBSERVE -> INPUT`

The loop is closed operationally but authority remains partitioned. No group gains universal authority because it participates in every cycle.
