# Timeline Event Record

Status: working schema

## Purpose

Represent time as a traceable input and observed outcome rather than an informal date attached to work.

## Fields

### Identity
- timeline_event_id
- task_id
- source_event_id
- prior_timeline_event_id

### Requested time
- input_class
- requested_start
- requested_finish
- deadline
- not_before
- review_window
- retest_interval
- expiry
- observation_window
- cooldown
- external_wait_condition

### Interpretation
- hard_or_soft
- urgency_basis
- consequence_if_missed
- schedule_confidence

### Constraint resolution
- dependency_ready_time
- evidence_valid_until
- authorization_valid_until
- earliest_safe_start
- earliest_valid_finish
- conflict_refs

### Decision
- timeline_status
- scheduled_start
- scheduled_finish
- reason
- displaced_task_refs
- escalation_required

### Actuals
- actual_start
- actual_finish
- delay_reason
- estimate_error

### Provenance
- created_at
- producer
- method
- workflow_run
- source_commit

## Allowed timeline status

`UNSCHEDULED | WAITING_DEPENDENCY | READY | SCHEDULED | ACTIVE | PAUSED | REVIEW_DUE | VERIFY_DUE | OVERDUE | COMPLETE | CANCELLED`

## Governing rules

- original requested dates are append-only history;
- replanning creates a new timeline event rather than rewriting the old one;
- time cannot override authority, evidence, safety, or hard dependency;
- estimates may learn from historical durations while governance thresholds remain governed separately.
