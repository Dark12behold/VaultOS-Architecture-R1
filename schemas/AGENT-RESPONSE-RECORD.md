# Agent Response Record

Status: working schema

## Purpose

Provide one portable record format for responses emitted by GitHub automation, MAC, Peaches, Gauntlet, evaluators, build agents, or human-governance adapters.

## Fields

### Identity
- response_id
- event_id
- task_id
- parent_response_id
- correlation_id

### Participants
- source_group
- source_agent
- source_version
- target_group
- target_agent

### Input context
- source_refs
- requested_action
- input_summary
- timeline_inputs
- dependency_refs
- governing_refs

### State assessment
- observed_state
- interpretation
- assumptions
- uncertainty
- contradiction_refs
- confidence_basis

### Authority
- authority_requested
- authority_available
- authority_source
- authority_scope
- authorization_status

### Proposed action
- action_class
- proposed_action
- alternatives_considered
- constraints
- reversibility
- expected_result
- expected_duration
- not_before
- deadline

### Verification
- verification_method
- falsification_condition
- evaluator_required
- evidence_required

### Output
- status
- result_summary
- produced_refs
- evidence_refs
- followup_task_refs
- escalation_condition

### Provenance
- created_at
- producer
- method
- source_commit
- workflow_run
- environment_ref

## Allowed status

`RECEIVED | NEEDS_INPUT | PROPOSED | READY | BLOCKED | EXECUTING | VERIFYING | PASS | FAIL | UNCERTAIN | DEFERRED | ESCALATED`

## Rules

- status != authorization;
- confidence != evidence;
- proposed_action != executed_action;
- executed_action != verified_result;
- timeline pressure does not change epistemic or authorization state;
- consequential generator output requires independent evaluation when the governing contract demands it.
