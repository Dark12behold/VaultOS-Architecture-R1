# VaultOS Principle / Evidence Graph Contract 01

Status: ACCEPTED ARCHITECTURE CONTRACT
Date: 2026-08-31
Source checkpoint: `PRINCIPLE_EVIDENCE_GRAPH_IMPLEMENTATION_SPEC_01.md`
Drive ID: `1RYGJqbmzfTuGijpX-rHIyOBBy_hXcIy4`

## Scope

This contract promotes the smallest evidence-supported first increment for the Seed Architecture terms **Principle Graph** and **Evidence Graph**.

It does not authorize or imply Reasoned Knowledge State, multi-hop graph reasoning, truth scoring, contradiction diagnosis, persistence, or new global primitives.

## Structural asymmetry

Principle and EvidenceObject are not symmetric graph nodes in the verified implementation.

`Principle` contains explicit typed targeted relations to other Principle identities through `PrincipleRelation` and the closed `PRINCIPLE_RELATION_TYPES` vocabulary.

`EvidenceObject` contains no EvidenceObject-to-EvidenceObject edge field. Its connective fields for this increment are `claimId` and `polarity`, with existing source-quality/provenance/revision data remaining attached to each EvidenceObject.

Therefore:

- Principle Graph is a read-only relation query view.
- Evidence Graph is a read-only claim-grouping/filter view.
- They remain separate architectural structures.
- No shared traversal engine is required or authorized for the first increment.

## Ownership and lifecycle

Both structures are stateless, non-owning, and caller-supplied.

They may hold references to already-constructed Principle or EvidenceObject instances for their in-memory query lifetime, but they do not own persistence, mutate sources, create authority, or become new primitives.

## Principle Graph contract

The first increment may expose only direct, single-hop queries over existing Principle relations:

- outgoing relations by source Principle identity;
- incoming relations by target Principle identity;
- filtering by existing Principle relation type.

The first increment excludes:

- multi-hop traversal;
- path discovery;
- cycle-walking algorithms;
- inferred/transitive relations;
- new relation types.

### Relation vocabulary

The only authorized relation vocabulary is the already-implemented `PRINCIPLE_RELATION_TYPES`:

- `expressed_by`
- `constrained_by`
- `composed_of`
- `equivalent_under_conditions`
- `opposite_of`
- `scales_into`
- `emerges_from`
- `transferable_to`
- `invalidated_by`
- `refined_by`

## PrincipleGraphEdge

`PrincipleGraphEdge` is accepted as a non-primitive implementation result type for the first increment:

```ts
{
  sourceId: string,
  relation: PrincipleRelation,
  targetResolved: boolean
}
```

Purpose:

- `sourceId` identifies the declaring Principle;
- `relation` preserves the existing PrincipleRelation without duplicating its semantics;
- `targetResolved` explicitly states whether the relation target exists in the caller-supplied Principle set.

Missing targets must never be silently fabricated or silently erased.

## Duplicate and identity semantics

If more than one supplied Principle has the same Principle identity, graph construction/query initialization must fail rather than guess which instance is authoritative.

Existing source-level restrictions remain authoritative:

- exact duplicate Principle relations are rejected upstream;
- self-relations are rejected upstream;
- distinct relation types between the same source and target remain distinct and must not be collapsed.

## Deterministic ordering

Outgoing results preserve the existing relation insertion order of the source Principle.

Incoming results are deterministic independent of constructor input ordering. They are ordered first by source Principle identity, then by each source Principle's existing relation insertion order.

Repeated identical queries against unchanged inputs must return the same logical ordering and content.

## Evidence Graph contract

Evidence Graph does not invent edges between EvidenceObject instances.

The first increment may expose only read-only grouping/filtering over caller-supplied EvidenceObject instances using existing fields:

- group/filter by `claimId`;
- within a claim group, filter by existing `polarity` values.

Existing EvidenceObject instances are returned directly; no new Evidence Graph result type is required for this increment.

Evidence Graph must not perform:

- contradiction diagnosis;
- truth determination;
- confidence computation or calibration;
- automatic source-quality inference;
- promotion decisions;
- evidence synthesis into new relations;
- lifecycle decisions.

## Governing invariants

```text
QUERY != MUTATION
TRAVERSAL != AUTHORIZATION
RELATION != TRUTH
GRAPH CONNECTIVITY != EVIDENCE VALIDITY
GROUPING != DIAGNOSIS
```

The graph structures must not mutate Principle, EvidenceObject, provenance, revisions, confidence, source quality, relations, or architecture state.

## Package identity

This contract does not assign a package number. Package identity remains UNRESOLVED unless primary evidence explicitly establishes one.

Chronological succession alone is insufficient to name a package.

## Falsification / reopening conditions

This first increment must be reopened before implementation scope expands if primary evidence establishes any of the following:

- Principle Graph requires multi-hop traversal;
- multi-hop behavior requires cycle/depth semantics not presently specified;
- Evidence Graph requires actual EvidenceObject-to-EvidenceObject edges;
- graph behavior depends on unresolved Seed Architecture promotion/confidence/contradiction-lifecycle semantics;
- implementation requires new persistence, authority, or a new global primitive.

## Implementation readiness

The architecture is UNBLOCKED for exactly this first increment:

1. Principle Graph as direct read-only incoming/outgoing/type-filter queries over existing PrincipleRelation data.
2. Evidence Graph as read-only claim grouping and polarity filtering over existing EvidenceObject data.

Any broader behavior requires a separately governed architecture change before implementation.
