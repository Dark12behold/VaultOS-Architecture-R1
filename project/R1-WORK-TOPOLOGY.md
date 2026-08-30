# R1 Work Topology

Status: operational organization model
Authority: organizational only; architecture and evidence remain authoritative in their own domains

## Purpose

This document defines the durable boxes into which R1 work, observations, issues, evidence, evaluations, and descendant candidates should fall. The boxes exist before implementation so work does not repeatedly stop to invent containers while moving between human and AI collaborators.

## Top-level boxes

### 1. Baseline Definition
Defines what R1 claims, protects, permits, and leaves unresolved.

Depends on: governing architecture documents.
Produces: testable R1 baseline.

### 2. Observable Surface
Defines what must be measurable or recordable during R1 behavior before interpretation.

Depends on: baseline definition and behavioral contracts.
Produces: observation records, telemetry expectations, measurement boundaries.

### 3. Issues
Captures deviations, limitations, ambiguity, risk, excessive complexity, missing observability, security concerns, knowledge gaps, or other matters requiring evaluation.

Depends on: observations or explicit architecture review.
Produces: issue records with traceable evidence and disposition.

### 4. Evaluation
Independent or governed interpretation of observations and issues.

Depends on: observations, issues, applicable contracts, invariants, and evidence.
Produces: pass/fail/uncertain judgments, competing explanations, falsification needs.

### 5. Diagnosis
Separates symptom from mechanism, contributing conditions, confounders, and root cause where established.

Depends on: evaluation and evidence.
Produces: bounded corrective or experimental hypotheses.

### 6. Correction / Experiment
Tests the smallest justified intervention or hypothesis.

Depends on: diagnosis, authority, reversibility class, protected invariants.
Produces: intervention evidence, experiment evidence, possible implementation delta.

### 7. Verification
Determines whether the correction, experiment, or implementation actually produced the claimed behavior without prohibited regression.

Depends on: applicable contract, evidence requirements, golden corpus, regression surface.
Produces: verified result or new issue/evidence.

### 8. Finding
Preserves validated lessons without silently rewriting earlier observation history.

Depends on: verified evidence and appropriate provenance.
Produces: preserved failure knowledge, limitations, discoveries, principles, contradictions, or generalizations.

### 9. Inheritance Decision
Determines what a descendant should PRESERVE, CORRECT, REFINE, DISCOVER, COLLAPSE, GENERALIZE, DEFER, or REJECT.

Depends on: findings and governing promotion rules.
Produces: R2 candidate delta or explicit no-change decision.

### 10. Architecture Change Proposal
Exists only when a validated candidate warrants governed architectural modification.

Depends on: promotion review outcome = ACP_CANDIDATE.
Produces: proposed, accepted, deferred, or rejected architecture change record.

## Dependency spine

`Baseline -> Observable Surface -> Issue -> Evaluation -> Diagnosis -> Correction/Experiment -> Verification -> Finding -> Inheritance Decision -> ACP Candidate`

This is not a mandatory linear pipeline. Work may branch, repeat, or return to earlier stages. The dependency spine defines semantic precedence, not bureaucratic ceremony.

## Protected separations

- observation != interpretation
- measurement != reality
- issue != failure
- proposal != permission
- generator != evaluator
- execution != success
- confidence != evidence
- implementation != verification
- experimental success != architectural promotion

## Project-board use

GitHub Project items should map to these boxes using native fields where available. Recommended project fields:

- Work Box
- Status
- Revision
- Severity
- Priority
- Evidence Status
- Verification Status
- Reversibility
- Parent / Sub-issue
- Blocked By / Blocking
- Architecture Impact
- Descendant Disposition

GitHub-native fields should be used where they already represent the concept cleanly. VaultOS-specific semantic distinctions should remain in issue bodies or repository records until a project field is both useful and stable enough to justify creation.
