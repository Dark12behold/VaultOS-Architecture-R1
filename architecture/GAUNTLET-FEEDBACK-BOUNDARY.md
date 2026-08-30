# Gauntlet Feedback Boundary

Status: governing cross-repository relationship

## Purpose

VaultOS architecture revisions and the evolving MAC / Peaches / Gauntlet system SHALL develop on separate lineages.

Architecture lineage:

R1 -> R2 -> R3 -> ...

Evaluation lineage:

T1 -> T2 -> T3 -> ...

The Gauntlet is not version-bound to any single architecture revision. A later Gauntlet generation may re-evaluate an earlier architecture revision and discover a failure class that was not detectable when that revision was first tested.

Historical outcomes remain true within their recorded test context. A prior PASS under T1 is not rewritten if T4 later detects a new failure; the later result adds new evidence.

## Separation of roles

- Architecture defines governed expected truths, contracts, protected invariants, and revision lineage.
- MAC acts and reasons for the user within authority boundaries.
- Peaches guards, challenges, contains, and protects.
- Gauntlet orchestrates controlled challenge conditions.
- Evaluators judge results and evidence.
- Test corpus preserves reusable challenge conditions.

MAC != Peaches != Gauntlet != Evaluator.

No component under test SHALL become the sole author, executor, and judge of its own validation.

## Issue-to-Gauntlet feedback

An issue MAY create a Gauntlet obligation when it represents a reusable lesson rather than a one-off maintenance concern.

Pipeline:

OBSERVATION
  -> ISSUE
  -> EVALUATION / DIAGNOSIS
  -> TESTABLE FAILURE CLASS?
      -> NO: preserve as finding / limitation / note
      -> YES: GAUNTLET QUEUE
          -> SCENARIO CANDIDATE
          -> REPRODUCE
          -> PROMOTE TO GAUNTLET SCENARIO when justified
          -> VERIFY CORRECTION
          -> PRESERVE REGRESSION TEST
          -> RE-RUN AGAINST DESCENDANT AND HISTORICAL BUILDS

An issue SHOULD enter the Gauntlet queue when it represents one or more of:

- reproducible failure class;
- protected invariant violation;
- authority or security boundary failure;
- regression risk;
- repeated weakness;
- discovered edge condition;
- dangerous ambiguity;
- failure mode with meaningful blast radius;
- lesson that descendants should not need to relearn empirically.

Issue queue != Gauntlet queue.

Cosmetic, editorial, or purely local maintenance issues do not automatically become permanent tests.

## Required lineage metadata

Every consequential Gauntlet run SHOULD record:

- architecture_revision;
- implementation_build;
- mac_version;
- peaches_version;
- gauntlet_generation;
- scenario_id and scenario_version;
- evaluator_id and evaluator_version;
- fixture/environment version;
- expected-behavior source;
- evidence outputs;
- result;
- historical comparison refs.

## Gauntlet candidate record

A testable issue promoted toward the Gauntlet SHOULD preserve:

- source_issue;
- originating_revision;
- observed_symptom;
- failure_class;
- affected_invariant;
- why_this_matters;
- reproduction_conditions;
- evidence_refs;
- expected_failure;
- expected_safe_behavior;
- falsification_condition;
- promotion_status.

## Governing principle

Architecture learns from failure. The Gauntlet remembers the failure independently.

The purpose of this separation is to prevent descendant architectures from silently erasing prior lessons and to allow the evaluation system itself to mature without becoming coupled to the architecture revision it is testing.
