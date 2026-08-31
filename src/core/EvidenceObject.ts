import { createHash } from "node:crypto";

/**
 * VaultOS/MAC — Package 0 — Core Primitive: EvidenceObject
 *
 * An EvidenceObject is a node in the Evidence Graph. It connects a claim
 * to its provenance, source quality, temporal validity, and revision
 * history. Evidence does not overwrite its own history: revising the
 * assessed source quality appends to a revision log rather than erasing
 * the prior value, so a conclusion always remains traceable back through
 * how confidence in it changed over time (Core Governing Rules: "Every
 * promoted conclusion must preserve provenance").
 */

export const EVIDENCE_POLARITIES = ["supports", "contradicts"] as const;
export type EvidencePolarity = (typeof EVIDENCE_POLARITIES)[number];

export const EVIDENCE_SOURCE_TYPES = [
  "observation",
  "experiment",
  "reasoning",
  "test",
  "external_source",
] as const;
export type EvidenceSourceType = (typeof EVIDENCE_SOURCE_TYPES)[number];

export interface EvidenceRevision {
  readonly priorSourceQuality: number;
  readonly note: string;
  readonly revisedAt: string;
}

export interface EvidenceObjectInit {
  id: string;
  claimId: string;
  polarity: EvidencePolarity;
  sourceType: EvidenceSourceType;
  sourceQuality: number;
  provenance: string[];
  observedAt: string;
  validUntil?: string;
}

export class EvidenceValidationError extends Error {}
export class EvidenceFrozenError extends Error {}

function assertValidQuality(q: number, label: string): void {
  if (typeof q !== "number" || Number.isNaN(q) || q < 0 || q > 1) {
    throw new EvidenceValidationError(`${label} must be a number in [0, 1], got: ${q}`);
  }
}

export class EvidenceObject {
  readonly id: string;
  readonly claimId: string;
  readonly polarity: EvidencePolarity;
  readonly sourceType: EvidenceSourceType;
  readonly provenance: readonly string[];
  readonly observedAt: string;
  readonly validUntil?: string;
  /** Bookkeeping only — when this object was constructed in-session.
   *  Distinct from observedAt (when the underlying evidence occurred).
   *  Excluded from contentHash, same as Principle.createdAt. */
  readonly recordedAt: string;

  private _sourceQuality: number;
  private _revisions: EvidenceRevision[] = [];
  private _frozen = false;

  constructor(init: EvidenceObjectInit) {
    if (!init.id || init.id.trim().length === 0) {
      throw new EvidenceValidationError("EvidenceObject.id must be a non-empty string");
    }
    if (!init.claimId || init.claimId.trim().length === 0) {
      throw new EvidenceValidationError("EvidenceObject.claimId must be a non-empty string");
    }
    if (!EVIDENCE_POLARITIES.includes(init.polarity)) {
      throw new EvidenceValidationError(`Unknown polarity: "${init.polarity}"`);
    }
    if (!EVIDENCE_SOURCE_TYPES.includes(init.sourceType)) {
      throw new EvidenceValidationError(`Unknown sourceType: "${init.sourceType}"`);
    }
    assertValidQuality(init.sourceQuality, "EvidenceObject.sourceQuality");
    if (!Array.isArray(init.provenance) || init.provenance.length === 0) {
      throw new EvidenceValidationError("EvidenceObject.provenance must contain at least one entry");
    }
    if (!init.observedAt || init.observedAt.trim().length === 0) {
      throw new EvidenceValidationError("EvidenceObject.observedAt must be a non-empty ISO timestamp");
    }
    this.id = init.id;
    this.claimId = init.claimId;
    this.polarity = init.polarity;
    this.sourceType = init.sourceType;
    this._sourceQuality = init.sourceQuality;
    this.provenance = Object.freeze([...init.provenance]);
    this.observedAt = init.observedAt;
    this.validUntil = init.validUntil;
    this.recordedAt = new Date().toISOString();
  }

  get sourceQuality(): number {
    return this._sourceQuality;
  }

  get revisions(): readonly EvidenceRevision[] {
    return [...this._revisions];
  }

  get isFrozen(): boolean {
    return this._frozen;
  }

  /** Revises the assessed source quality. The prior value is preserved in
   *  the revision log, not discarded — identity (contentHash) changes as
   *  a result, so a revised EvidenceObject is traceably distinct from its
   *  pre-revision state. */
  reviseConfidence(newSourceQuality: number, note: string): void {
    if (this._frozen) {
      throw new EvidenceFrozenError(`EvidenceObject "${this.id}" is frozen; confidence cannot be revised`);
    }
    assertValidQuality(newSourceQuality, "newSourceQuality");
    if (!note || note.trim().length === 0) {
      throw new EvidenceValidationError("A revision note is required to explain why confidence changed");
    }
    this._revisions.push({
      priorSourceQuality: this._sourceQuality,
      note,
      revisedAt: new Date().toISOString(),
    });
    this._sourceQuality = newSourceQuality;
  }

  freeze(): void {
    this._frozen = true;
  }

  /** Temporal validity check. Evidence with no validUntil is treated as
   *  permanently valid; evidence past its validUntil is not valid at the
   *  queried instant (Core Governing Rule: "Truth does not change merely
   *  because a model changes" — but evidence CAN expire without the
   *  underlying truth changing, which is exactly why this is a separate
   *  check from sourceQuality). */
  isValidAt(atIso: string): boolean {
    if (!this.validUntil) return true;
    return new Date(atIso).getTime() <= new Date(this.validUntil).getTime();
  }

  contentHash(): string {
    const canonical = {
      id: this.id,
      claimId: this.claimId,
      polarity: this.polarity,
      sourceType: this.sourceType,
      sourceQuality: this._sourceQuality,
      provenance: [...this.provenance].sort(),
      observedAt: this.observedAt,
      validUntil: this.validUntil ?? null,
      revisions: [...this._revisions].sort((a, b) => a.revisedAt.localeCompare(b.revisedAt)),
    };
    return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
  }

  equals(other: EvidenceObject): boolean {
    return this.contentHash() === other.contentHash();
  }
}
