# Gauntlet Candidate Record

Status: cross-repository transfer schema

This record is created when an architecture/revision issue has enough significance to enter consideration for the independent Gauntlet queue.

## Identity
- candidate_id
- source_issue
- originating_repository
- originating_revision
- created_at
- created_by
- record_version

## Trigger
- observed_symptom
- failure_class
- issue_type
- recurrence
- severity
- blast_radius
- affected_invariant_refs
- affected_contract_refs

## Why this matters
- risk_statement
- protected_property
- descendant_learning_value
- regression_risk
- reason_permanent_or_reusable_test_is_warranted

## Reproduction
- starting_state
- trigger/input
- prerequisite_conditions
- environment_conditions
- dependency_state
- reproduction_steps_or_protocol
- known_nonreproducing_conditions
- reproducibility_status

## Expected behavior
- expected_failure_behavior_if_unfixed
- expected_safe_behavior
- prohibited_behavior
- acceptable_variance
- observable_outputs

## Evidence
- observation_refs
- evidence_refs
- evaluator_refs
- contradiction_refs
- provenance
- verification_status
- independence_status

## Falsification
- falsification_condition
- counterexamples
- confounders
- alternative_explanations
- unresolved_unknowns

## Queue disposition
- promotion_status: PROPOSED | EXPLORATORY | REPRODUCIBLE | PROMOTED | DEFERRED | REJECTED | RETIRED
- gauntlet_scenario_ref
- promotion_rationale
- rejection_or_deferral_reason
- next_action

## Historical linkage
- first_seen_revision
- last_seen_revision
- fixed_in_revision
- rerun_revisions
- historical_results

## Rule

Promotion into the Gauntlet does not mean the originating diagnosis was infallible. The scenario remains testable and falsifiable. If later evidence changes the understanding of the failure, preserve the original candidate record and add the newer interpretation rather than rewriting history.
