# Reasoning Input Record

Status: operational schema

## Purpose

Use this record to convert broad operator or agent intent into a precise, host-aware reasoning task without prematurely creating implementation structure.

## Identity

- input_id:
- created_at:
- created_by:
- source_ref:
- related_issue_refs:
- related_revision:

## Intent

- desired_outcome:
- why_it_matters:
- consequence_level: LOW | MEDIUM | HIGH | CRITICAL
- novelty_level: KNOWN | ADAPTED | NOVEL | UNKNOWN

## Scope

- included:
- excluded:
- repository_scope:
- cross_repository_scope:

## Starting State

- current_step:
- current_step_status:
- known_host_state:
- active_workflows:
- unresolved_failures:
- stale_or_expiring_inputs:

## Source of Truth

- governing_architecture_refs:
- behavioral_contract_refs:
- evidence_refs:
- human_authority_ref:

## Constraints

- authority_constraints:
- safety_constraints:
- architecture_constraints:
- temporal_constraints:
- cost_constraints:
- reversibility_constraints:

## Host Capability Scan

- native_capabilities_available:
- connector_capabilities_available:
- automation_capabilities_available:
- observation_capabilities_available:
- evidence_capabilities_available:
- unavailable_or_manual_capabilities:

## Consolidation Check

- existing_components_that_overlap:
- reusable_components:
- composable_components:
- merge_candidates:
- extension_candidates:
- replacement_candidates:
- justification_if_new_component_required:

## Dependency Topology

- hard_dependencies:
- soft_dependencies:
- blocking_conditions:
- parallelizable_work:
- downstream_dependents:

## Action Plan

- preferred_execution_layer:
- proposed_actions:
- expected_outputs:
- expected_artifacts:
- expected_state_mutations:
- rollback_path:

## Evidence and Verification

- evidence_required:
- evaluator_required:
- deterministic_checks:
- success_condition:
- falsification_condition:
- uncertainty_condition:

## Completion Gate

- completion_requirements:
- dependent_next_step:
- next_step_unlock_condition:

## Disposition

- result_status: PROPOSED | READY | RUNNING | COMPLETE | INCOMPLETE | BLOCKED | UNCERTAIN
- redundancy_disposition: REUSE | COMPOSE | MERGE | EXTEND | REPLACE | NEW | NONE
- next_action:
- escalation_required:
