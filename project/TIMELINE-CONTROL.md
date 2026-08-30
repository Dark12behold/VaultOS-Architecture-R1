# Timeline Input Control

Status: operational scheduling and sequencing model

## Purpose

Provide structured control over time-related inputs without allowing arbitrary dates to override dependencies, evidence requirements, safety boundaries, or authority.

Time is an input to planning, not an authority source.

## Timeline input classes

- TARGET_DATE — desired completion date.
- NOT_BEFORE — earliest allowed start.
- DEADLINE — latest acceptable completion.
- REVIEW_WINDOW — period during which review should occur.
- RETEST_INTERVAL — cadence for reevaluation.
- EXPIRY — point after which evidence/authorization/capability state must be refreshed.
- WAIT_CONDITION — time cannot advance work until an external condition is satisfied.
- COOLDOWN — minimum interval after a consequential action before another related action.
- OBSERVATION_WINDOW — minimum duration required to collect meaningful evidence.

## Timeline control fields

Every consequential task MAY include:

- created_at
- target_start
- target_finish
- not_before
- deadline
- expected_duration
- dependency_ready_time
- evidence_valid_until
- authorization_valid_until
- review_due
- retest_due
- observation_window
- cooldown_until
- external_wait_condition
- urgency_basis
- schedule_confidence

## Scheduling precedence

The scheduler SHALL apply constraints in this order:

1. constitutional / safety / authority boundary;
2. hard dependency;
3. evidence validity requirement;
4. required observation or cooldown window;
5. explicit deadline;
6. severity / consequence;
7. priority;
8. desired target date;
9. convenience / batching optimization.

A deadline does not authorize bypassing a higher-order constraint.

## Timeline states

`UNSCHEDULED | WAITING_DEPENDENCY | READY | SCHEDULED | ACTIVE | PAUSED | REVIEW_DUE | VERIFY_DUE | OVERDUE | COMPLETE | CANCELLED`

## Event response logic

When a new timeline input arrives:

1. Preserve the original requested time.
2. Determine whether the time is hard, soft, or informational.
3. Resolve dependencies and required gates.
4. Calculate earliest-safe start and earliest-valid finish.
5. Compare against requested deadline.
6. Emit one of:
   - FEASIBLE;
   - FEASIBLE_WITH_RISK;
   - BLOCKED_BY_DEPENDENCY;
   - BLOCKED_BY_EVIDENCE;
   - BLOCKED_BY_AUTHORITY;
   - DEADLINE_CONFLICT;
   - NEEDS_REPLAN.
7. Record the reason whenever requested timing is changed.

## Timeline feedback loop

`TIME INPUT -> CONSTRAINT RESOLUTION -> ACTION PLAN -> EXECUTION -> OBSERVED DURATION -> SCHEDULE ERROR -> MODEL UPDATE`

The system SHOULD learn planning estimates from observed durations without silently changing governance thresholds.

## Historical timeline integrity

Planned dates, actual dates, delays, and causes SHALL remain distinguishable. A revised estimate must not overwrite the original estimate.

Recommended fields:

- planned_start_original
- planned_finish_original
- planned_start_current
- planned_finish_current
- actual_start
- actual_finish
- delay_reason
- estimate_error
- replanning_events

## Queue interaction

Timeline modifies queue ordering but does not collapse queue type.

Architecture queue, implementation queue, Gauntlet queue, evidence queue, and release queue remain separate. A single item may have linked tasks in several queues with different timing states.

## Escalation rules

Escalate when:

- deadline conflicts with protected invariant;
- dependency has no credible completion estimate;
- evidence will expire before execution;
- authorization expires before completion;
- repeated schedule slips indicate a bad estimate model;
- a high-consequence task becomes overdue;
- an urgent task would displace a higher-severity safety or recovery task.

## Governing rule

Schedule pressure can change order, staffing, scope, or proposed strategy. It cannot manufacture evidence, authorization, capability, or success.
