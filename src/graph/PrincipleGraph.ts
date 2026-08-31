import { Principle, PrincipleRelation, PrincipleRelationType } from "../core/Principle.js";

/**
 * VaultOS/MAC — Principle Graph (first increment)
 *
 * Authorized scope only: outgoing relations by id, incoming relations by
 * id, filter by existing relation type. Read-only, stateless, non-owning,
 * caller-supplied, in-memory only, non-authoritative, non-mutating.
 *
 *   QUERY != MUTATION        — no method here calls any mutating method
 *     on a supplied Principle.
 *   TRAVERSAL != AUTHORIZATION — this class grants nothing.
 *   RELATION != TRUTH        — an edge being present asserts nothing
 *     about whether the relation is verified, true, or promoted.
 *
 * Not implemented, deliberately: multi-hop traversal, path discovery,
 * transitive inference, inferred relations, graph mutation, new relation
 * types, cycle-walking algorithms. See
 * PRINCIPLE_EVIDENCE_GRAPH_IMPLEMENTATION_SPEC_01 for the evidence this
 * scope is drawn from.
 */

export interface PrincipleGraphEdge {
  readonly sourceId: string;
  readonly relation: PrincipleRelation;
  readonly targetResolved: boolean;
}

export class PrincipleGraphValidationError extends Error {}

export class PrincipleGraph {
  private readonly _byId: ReadonlyMap<string, Principle>;

  constructor(principles: readonly Principle[]) {
    const byId = new Map<string, Principle>();
    for (const p of principles) {
      if (byId.has(p.id)) {
        throw new PrincipleGraphValidationError(
          `Duplicate Principle id supplied to PrincipleGraph: "${p.id}"`
        );
      }
      byId.set(p.id, p);
    }
    this._byId = byId;
  }

  /** Direct outgoing edges from a Principle, in the exact order they
   *  appear on that Principle's own `relations` getter. */
  outgoing(principleId: string): readonly PrincipleGraphEdge[] {
    const source = this._byId.get(principleId);
    if (!source) return [];
    return source.relations.map((relation) => ({
      sourceId: principleId,
      relation,
      targetResolved: this._byId.has(relation.targetId),
    }));
  }

  /** Direct incoming edges to a Principle: every relation, across the
   *  supplied set, whose targetId equals principleId. Deterministically
   *  ordered by source Principle id (ascending string comparison), then
   *  by that source's own relation insertion order — independent of the
   *  order instances were passed to the constructor. */
  incoming(principleId: string): readonly PrincipleGraphEdge[] {
    const sourceIds = [...this._byId.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const edges: PrincipleGraphEdge[] = [];
    for (const sourceId of sourceIds) {
      const source = this._byId.get(sourceId)!;
      for (const relation of source.relations) {
        if (relation.targetId === principleId) {
          edges.push({ sourceId, relation, targetResolved: this._byId.has(relation.targetId) });
        }
      }
    }
    return edges;
  }

  /** Filters any edge list (e.g. the result of outgoing()/incoming()) by
   *  an existing PrincipleRelationType. A pure filter over already-typed
   *  data — introduces no new vocabulary. */
  filterByType(
    edges: readonly PrincipleGraphEdge[],
    type: PrincipleRelationType
  ): readonly PrincipleGraphEdge[] {
    return edges.filter((e) => e.relation.type === type);
  }
}
