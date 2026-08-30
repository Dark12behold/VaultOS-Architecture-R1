# Issue Record

Status: R1 working schema
Purpose: capture a matter requiring evaluation without assuming that every issue is a failure

An issue may represent a defect, limitation, ambiguity, excessive latency, unnecessary complexity, missing observability, security concern, architectural concern, inconsistency, contradiction, knowledge gap, regression risk, or other matter requiring governed attention.

## Identity

- issue_id
- issue_type
- title
- description
- originating_revision
- originating_component
- originating_capability
- originating_environment

## Detection

- detected_at
- detected_by
- observation_refs
- symptom_refs
- evidence_refs
- contract_refs
- invariant_refs

## Classification

- severity
- priority
- frequency
- recurrence
- reproducibility
- persistence
- reversibility_class
- architecture_impact

## Impact

- affected_behavior
- affected_state
- affected_capabilities
- affected_dependencies
- affected_users
- blast_radius
- protected_property_at_risk

## Conditions

- trigger_conditions
- contributing_conditions
- prerequisite_conditions
- environmental_conditions
- resource_conditions
- permission_or_authority_conditions

## Expected vs Actual

- expected_behavior
- actual_behavior
- deviation
- consequence
- tolerance_exceeded

## Causal Status

- known_cause
- suspected_cause
- alternative_causes
- confounders
- causal_status
- required_falsification

## Containment and Correction

- containment_status
- workaround
- candidate_fix
- correction_status
- correction_refs
- expected_effect
- actual_effect
- unintended_effects

## Verification

- verification_status
- verification_method
- verification_evidence_refs
- regression_surface
- falsification_conditions

## Lineage

- first_seen_revision
- last_seen_revision
- descendant_status
- parent_issue_ref
- sub_issue_refs
- blocked_by_refs
- blocking_refs
- related_issue_refs
- superseded_by_ref

## Disposition

One or more may apply during evaluation:

- PRESERVE
- CORRECT
- REFINE
- DISCOVER
- COLLAPSE
- GENERALIZE
- DEFER
- REJECT

## Descendant Candidate

- candidate_architecture_delta
- structures_to_preserve
- descendant_constraint
- candidate_r2_delta
- promotion_review_ref
- acp_ref

## Ownership and History

- owner
- evaluator
- authorization_ref
- history_refs
- closed_by_evidence_ref

## Rule

Issue != failure.

An issue records that something deserves attention. Evaluation and evidence determine what the issue means, whether correction is warranted, and whether any lesson should affect a descendant revision.
