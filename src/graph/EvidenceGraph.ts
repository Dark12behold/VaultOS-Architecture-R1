import { EvidenceObject, EvidencePolarity } from "../core/EvidenceObject.js";

/**
 * VaultOS/MAC — Evidence Graph (first increment)
 *
 * Authorized scope only: group/query by claimId, filter a claim group by
 * existing polarity. Returns the actual supplied EvidenceObject instances
 * directly — no new result type, since nothing new is synthesized.
 *
 * EvidenceObject carries no EvidenceObject-to-EvidenceObject relation
 * field (verified: only claimId and polarity connect it to anything).
 * This is therefore a grouping/index view, not a traversal graph — that
 * is what the underlying data permits, not a scope choice made for
 * convenience. See PRINCIPLE_EVIDENCE_GRAPH_IMPLEMENTATION_SPEC_01.
 *
 *   GROUPING != DIAGNOSIS — no contradiction diagnosis, truth scoring,
 *     confidence computation/calibration, evidence promotion, evidence
 *     synthesis, or source-quality inference is implemented here.
 *   GRAPH CONNECTIVITY != EVIDENCE VALIDITY — being grouped under a
 *     claim asserts nothing about whether the evidence is correct.
 */

export class EvidenceGraph {
  private readonly _byClaimId: ReadonlyMap<string, readonly EvidenceObject[]>;

  constructor(evidenceObjects: readonly EvidenceObject[]) {
    const byClaimId = new Map<string, EvidenceObject[]>();
    for (const e of evidenceObjects) {
      const group = byClaimId.get(e.claimId);
      if (group) {
        group.push(e);
      } else {
        byClaimId.set(e.claimId, [e]);
      }
    }
    this._byClaimId = byClaimId;
  }

  /** All supplied EvidenceObject instances sharing a claimId, in the
   *  order they were supplied to the constructor. Empty array if the
   *  claim has no supplied evidence. */
  byClaimId(claimId: string): readonly EvidenceObject[] {
    return [...(this._byClaimId.get(claimId) ?? [])];
  }

  /** The subset of a claim's evidence matching a given polarity. */
  byClaimIdAndPolarity(claimId: string, polarity: EvidencePolarity): readonly EvidenceObject[] {
    return this.byClaimId(claimId).filter((e) => e.polarity === polarity);
  }
}
