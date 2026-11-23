# MAC Workflow Recovery Contract v0.1 — Candidate, not accepted
Date: 2026-11-23
Status: PROPOSED / TEST PLAN ONLY
Scope: local-first MAC Workflow Engine + Runtime State Engine; no Cloudflare deployment or architecture promotion.

## Design gap DG-2026-11-23-01
After process termination or lost acknowledgments, MAC may replay an external action twice, or mark it complete without evidence. Existing R1 governance separates implementation from verification; this document specifies a testable runtime contract rather than asserting a completed implementation.

## Evidence graph
| Gap | Requirement | Candidate | Sources/evidence | Component | Dependency | Experiment | Result | Decision |
|---|---|---|---|---|---|---|---|---|
| crash between effect and acknowledgment | resume without silently repeating unsafe action | append-only journal + reconciliation | Temporal event history/replay (official vendor docs, established pattern); Google Eventarc duplicate/idempotency guidance (official docs) | Workflow Engine / Runtime State Engine | local durable transactional store | kill at every transition; compare external effect ledger | NOT RUN | candidate |
| model output changes across replay | deterministic control flow | freeze Action IR and input snapshot before execution | Temporal deterministic workflow docs (official) | Action IR | versioned schema + immutable event log | replay with different LLM output; ensure original IR reused | NOT RUN | candidate |
| duplicate delivery | at-most-one logical action intent | idempotency key + receipt reconciliation | Google Eventarc idempotency docs (official) | Effect Adapter | downstream idempotency or queryable receipts | inject duplicate event and dropped response | NOT RUN | candidate |
| unbounded retry | bounded failure handling | backoff + terminal/manual review | Google Workflows retry documentation (official) | Recovery Controller | error classification | permanent failure and offline tests | NOT RUN | candidate |

## Interface contract
ActionIR = {schema_version, action_id, workflow_id, step_id, actor_id, permission_scope, input_digest, effect_kind, target_ref, idempotency_key, retry_policy, requires_approval, provenance_ref}.
Event = {seq, workflow_id, action_id, type, time, payload_digest, prev_event_digest, actor_id, schema_version}.
Allowed states: PROPOSED -> AUTHORIZED -> PREPARED -> DISPATCHED -> CONFIRMED; DISPATCHED -> UNCERTAIN -> RECONCILED -> CONFIRMED; any pre-confirmed state -> FAILED or CANCELLED subject to policy.
Persist PREPARED transactionally before dispatch. After a crash, never automatically repeat an UNCERTAIN non-idempotent effect. Query receipts or require human resolution. Idempotency key is stable across retries. An append-only journal is evidence of intended transitions, not proof an external side effect happened.
Never put credentials or sensitive action payloads in provenance logs. Retain hashes and scoped references. Local store remains authoritative for local run state; optional cloud synchronization must not override it silently.

## Test gates
T1 crash before dispatch: 0 external effects, resumable.
T2 crash after effect before receipt: exactly 1 externally observed effect OR UNCERTAIN and no automatic replay.
T3 duplicate delivery: same action ID, no duplicate external effect where downstream supports idempotency.
T4 tampered journal: chain mismatch detected, no action dispatched.
T5 permission revoked: queued action blocked before dispatch.
T6 offline recovery: queued safe action resumes only after policy and permission recheck.
T7 schema upgrade: old ActionIR replay stable or migration explicitly rejected.
T8 model drift: changed generated output cannot rewrite a prepared ActionIR.
Record test environment, build SHA, seeds, fault-injection points, receipts, failures, and timestamps.

## Design Gap Register
DG-01 downstream service without idempotency or receipt lookup: cannot guarantee exactly-once effect. Keep UNCERTAIN; require reconciliation.
DG-02 local durability (fsync/SQLite WAL/transaction semantics) not benchmarked on target Android device.
DG-03 permission revocation races between check and external dispatch.
DG-04 journal retention, encryption and privacy boundaries not specified.

## Timeline markup
2026-08-31: Existing repo commits record Principle/Evidence Graph checkpoint and Functional Behavior Model boundary; implementation coverage remains limited.
2026-09-28: Cloudflare bootstrap commits; runtime status not reverified in this session.
2026-11-23: Candidate recovery contract v0.1 drafted. Source level: official technical documentation; MAC-specific runtime evidence: NONE. Promotion: BLOCKED pending T1–T8.
Next: implement isolated local SQLite test harness, simulate crash windows, then capture measured evidence before an ACP.
Sources:
- https://docs.temporal.io/encyclopedia/event-history
- https://docs.temporal.io/workflows
- https://docs.cloud.google.com/eventarc/docs/retry-events
- https://docs.cloud.google.com/workflows/docs/reference/syntax/retrying
