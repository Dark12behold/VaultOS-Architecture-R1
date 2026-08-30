# Observation Record

Status: R1 working schema
Purpose: capture what occurred before evaluation assigns meaning

An Observation Record records measurable or inspectable facts, conditions, transitions, and uncertainty. It SHALL NOT silently convert interpretation into observation.

## Identity

- observation_id
- observation_type
- observation_version
- originating_revision
- originating_component
- originating_capability
- originating_environment
- parent_observation_refs

## Time

- observed_at
- event_started_at
- event_completed_at
- duration
- sequence_position
- temporal_relationships
- validity_window
- stale_after

## Context

- starting_state
- environment_state
- active_capabilities
- active_constraints
- resource_state
- permission_state
- authorization_state
- relevant_principles
- relevant_contracts
- external_conditions
- dependency_state

## Stimulus

- triggering_event
- originating_actor
- user_intent_ref
- input
- input_type
- input_source
- expected_interpretation
- actual_interpretation

## Expected Behavior

- applicable_behavioral_contract
- expected_action
- expected_state_transition
- expected_outputs
- expected_side_effects
- prohibited_behavior
- protected_invariants
- acceptable_variance

## Actual Behavior

- selected_action
- execution_path
- state_transitions
- capability_selection
- worker_selection
- intermediate_outputs
- final_output
- side_effects
- resource_consumption
- latency
- retries
- fallback_behavior

## Observable Result

- result_state
- result_class: SUCCESS | FAILURE | PARTIAL | UNCERTAIN
- output_values
- state_delta
- environmental_delta
- persistent_changes
- temporary_changes
- external_effects
- user_visible_effects

## Comparison

- expected_vs_actual
- contract_satisfied
- invariant_satisfied
- deviation
- deviation_magnitude
- tolerance_exceeded
- regression_status
- previous_revision_comparison

## Issue Signals

- issue_detected
- issue_refs
- anomaly_type
- symptom
- recurrence
- reproducibility
- persistence
- immediate_containment

## Uncertainty

- directly_observed
- inferred
- assumed
- unknown
- measurement_uncertainty
- interpretation_uncertainty
- conflicting_observations
- missing_information
- alternative_explanations

## Evidence

- evidence_refs
- evidence_type
- producer
- collection_method
- source
- provenance
- independence
- verification_status
- artifact_refs
- hashes
- contradictions
- dependencies

## Authority

- requested_by
- proposed_by
- evaluated_by
- authorized_by
- executed_by
- verified_by
- authority_scope
- permission_basis

## Resources

- cpu
- memory
- storage
- bandwidth
- energy
- thermal_state
- latency
- monetary_cost
- quotas
- contention
- resource_pressure

## Causal Information

This section records causal status without pretending correlation is cause.

- candidate_causes
- established_causes
- correlations
- confounders
- interventions
- intervention_result
- counterfactual_expectation
- causal_status

## Provenance

- original_record_ref
- interpretation_history_refs
- reinterpretation_refs
- superseding_evidence_refs
- related_acp_refs
- architecture_version
- implementation_version
- immutable_hash

## Rule

Observation answers: what happened, under what conditions, to what, when, following what, and what changed.

Evaluation answers: what does it mean.
