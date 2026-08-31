# VaultOS Next Package Specification Recovery 01

Status: ACCEPTED SPECIFICATION RECOVERY — NO IMPLEMENTATION AUTHORIZED
Date: 2026-08-31

Upstream evidence artifact:
- Google Drive: `NEXT_PACKAGE_SPEC_RECOVERY_01.md`
- Drive ID: `1ufo7-v9TjzxuJMCeOjK7WiIZ5cvvD9QX`
- Reported checkpoint size: 10784 bytes
- Drive readback: independently readable and reconciled

## Current verified implementation boundary

### Package 0

Frozen six-primitive core:
- Principle
- EvidenceObject
- BehavioralContract
- ACP
- CapabilityProof
- Box

Verified freeze: 167/167 tests = 143 primitive tests + 24 integration-audit tests.

### Package 1

Environment + EnvironmentRepository.

EnvironmentRepository is in-memory only; no disk/cross-process runtime persistence is established.

### Package 2

Archive Historical Projection / ArchiveProjection.

Read-only historical-projection layer over existing P0/P1 getters. No new primitive and no new persistence.

## Recovered unmet supporting structures

The accepted Seed Architecture Section 4 names:

- Principle Graph
- Evidence Graph
- Functional Behavior Model

The first two are therefore established VaultOS terms, not newly invented terminology.

`Principle.ts` already carries the Seed-defined relation vocabulary through `PRINCIPLE_RELATION_TYPES`:

- expressed_by
- constrained_by
- composed_of
- equivalent_under_conditions
- opposite_of
- scales_into
- emerges_from
- transferable_to
- invalidated_by
- refined_by

The implementation gap is not relation vocabulary. The gap is graph-level traversal/query behavior across multiple Principle instances.

EvidenceObject already carries per-instance evidence information needed by an Evidence Graph, including support/contradiction polarity, source quality, provenance, and revisions. Graph-level traversal/aggregation behavior remains absent.

## Candidate next behavior

The smallest currently unblocked architecture behavior is a read-only Principle Graph / Evidence Graph traversal-query layer over already-existing P0 data.

This candidate is constrained to:

- caller-supplied existing Principle/EvidenceObject instances;
- read-only traversal/query behavior;
- existing relation vocabulary only;
- no new repository or persistence;
- no mutation of source primitives;
- no assertion that surfaced relations are true, verified, promoted, or authoritative;
- no automatic confidence/promotion/contradiction-lifecycle semantics.

ArchiveProjection provides a verified in-codebase precedent for this shape: non-owning, read-only composition over public getters without introducing a new primitive or persistence surface.

## Explicit exclusions

The first increment must not silently include:

- Reasoned Knowledge State;
- promotion thresholds;
- confidence calibration;
- contradiction lifecycle;
- automatic truth/verification decisions;
- cross-evidence contradiction diagnosis unless separately specified;
- Functional Behavior Model implementation;
- new relation types;
- new persistence.

Reasoned Knowledge State remains blocked by unresolved Seed Architecture Section 10 questions around promotion thresholds, confidence calibration, and contradiction lifecycle.

## Unresolved structural questions

The following remain UNRESOLVED and must be settled in specification before implementation:

1. whether Principle Graph and Evidence Graph are separate concrete structures or share one underlying governed relationship mechanism;
2. whether the graph layer has durable identity/lifecycle or is stateless composition over caller-supplied instances;
3. whether Evidence Graph contradiction behavior requires structure beyond existing EvidenceObject polarity;
4. the concrete result-shape type name for traversal results.

The result-shape name is a genuine naming gap. Any concrete name must be marked PROPOSED until accepted; the architecture currently specifies the behavior, not the result-object name.

## Implementation readiness

Read-only Principle/Evidence Graph traversal is UNBLOCKED at the behavior level but NOT YET AUTHORIZED FOR IMPLEMENTATION.

Before source changes, produce a bounded implementation specification that resolves only the minimum structural questions necessary for the first increment and preserves all exclusions above.

## Truth-domain note

This document records accepted forward architecture recovery. It does not claim that a graph implementation already exists, and it does not alter historical package evidence.
