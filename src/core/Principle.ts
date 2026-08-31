import { createHash } from "node:crypto";

/**
 * VaultOS/MAC — Package 0 — Core Primitive: Principle
 *
 * A Principle is a governing-relationship node in the Principle Graph.
 * It is NOT a topic label or a bag of text — it must carry an explicit
 * statement, at least one domain of applicability, and a typed relation
 * set to other principles. Identity is content-addressed (sha256 over a
 * canonical serialization of its stable fields) so two independently
 * constructed Principle objects with identical governing content collapse
 * to the same hash, while volatile bookkeeping fields (createdAt) do not
 * affect identity.
 */

export const PRINCIPLE_RELATION_TYPES = [
  "expressed_by",
  "constrained_by",
  "composed_of",
  "equivalent_under_conditions",
  "opposite_of",
  "scales_into",
  "emerges_from",
  "transferable_to",
  "invalidated_by",
  "refined_by",
] as const;

export type PrincipleRelationType = (typeof PRINCIPLE_RELATION_TYPES)[number];

export interface PrincipleRelation {
  readonly type: PrincipleRelationType;
  readonly targetId: string;
  readonly condition?: string;
}

export interface PrincipleInit {
  id: string;
  statement: string;
  domains: string[];
  immutable?: boolean;
}

export class PrincipleValidationError extends Error {}
export class PrincipleFrozenError extends Error {}

export class Principle {
  readonly id: string;
  readonly statement: string;
  readonly domains: readonly string[];
  readonly immutable: boolean;
  readonly createdAt: string;

  private _relations: PrincipleRelation[] = [];
  private _frozen = false;

  constructor(init: PrincipleInit) {
    if (!init.id || init.id.trim().length === 0) {
      throw new PrincipleValidationError("Principle.id must be a non-empty string");
    }
    if (!init.statement || init.statement.trim().length === 0) {
      throw new PrincipleValidationError("Principle.statement must be a non-empty string");
    }
    if (!Array.isArray(init.domains) || init.domains.length === 0) {
      throw new PrincipleValidationError("Principle.domains must contain at least one domain");
    }
    this.id = init.id;
    this.statement = init.statement;
    this.domains = Object.freeze([...init.domains]);
    this.immutable = init.immutable ?? false;
    this.createdAt = new Date().toISOString();
  }

  get relations(): readonly PrincipleRelation[] {
    return [...this._relations];
  }

  get isFrozen(): boolean {
    return this._frozen;
  }

  /** Root/governance principles are constructed immutable and reject relation
   *  mutation immediately. Non-immutable principles may be frozen later
   *  (e.g. after promotion) to lock further edges. */
  addRelation(type: PrincipleRelationType, targetId: string, condition?: string): void {
    if (this.immutable) {
      throw new PrincipleFrozenError(
        `Principle "${this.id}" is immutable (governance principle); relations cannot be added`
      );
    }
    if (this._frozen) {
      throw new PrincipleFrozenError(`Principle "${this.id}" is frozen; relations cannot be added`);
    }
    if (!PRINCIPLE_RELATION_TYPES.includes(type)) {
      throw new PrincipleValidationError(`Unknown relation type: "${type}"`);
    }
    if (!targetId || targetId.trim().length === 0) {
      throw new PrincipleValidationError("Relation targetId must be a non-empty string");
    }
    if (targetId === this.id) {
      throw new PrincipleValidationError(`Principle "${this.id}" cannot hold a relation to itself`);
    }
    const duplicate = this._relations.some(
      (r) => r.type === type && r.targetId === targetId && r.condition === condition
    );
    if (duplicate) {
      throw new PrincipleValidationError(
        `Duplicate relation: ${type} -> ${targetId}${condition ? ` (${condition})` : ""}`
      );
    }
    this._relations.push({ type, targetId, condition });
  }

  freeze(): void {
    this._frozen = true;
  }

  /** Content-addressed identity hash. Excludes volatile fields (createdAt)
   *  so identical governing content always yields the same hash regardless
   *  of when the object was constructed. */
  contentHash(): string {
    const canonical = {
      id: this.id,
      statement: this.statement,
      domains: [...this.domains].sort(),
      immutable: this.immutable,
      relations: [...this._relations]
        .map((r) => ({ type: r.type, targetId: r.targetId, condition: r.condition ?? null }))
        .sort((a, b) =>
          a.type === b.type
            ? a.targetId === b.targetId
              ? (a.condition ?? "").localeCompare(b.condition ?? "")
              : a.targetId.localeCompare(b.targetId)
            : a.type.localeCompare(b.type)
        ),
    };
    return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
  }

  equals(other: Principle): boolean {
    return this.contentHash() === other.contentHash();
  }
}
