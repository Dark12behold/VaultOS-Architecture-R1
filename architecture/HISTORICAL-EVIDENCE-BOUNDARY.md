# VaultOS Historical Evidence Boundary

Status: ACTIVE ARCHITECTURE GOVERNANCE
Date: 2026-08-31

## Purpose

This document prevents current VaultOS terminology from being projected backward into historical Package 0/1/2 records without primary evidence.

## Evidence precedence

When reconstructing historical architecture, use this precedence:

1. byte-verified source/checkpoint artifacts;
2. contemporaneous test output and manifests;
3. contemporaneous transcript/file-creation records;
4. later handoffs and summaries;
5. inferred architectural reconstruction.

A lower-precedence source cannot override contradictory higher-precedence evidence.

## Terminology rule

CURRENT_ARCHITECTURAL_CONCEPT != HISTORICAL_PACKAGE_TERMINOLOGY unless primary evidence establishes the relationship.

Modern VaultOS concepts may be valid architectural improvements without having existed in an earlier package under the same name or role.

Established VaultOS terms should be recovered from shared primary artifacts before new terminology is introduced. A newly introduced term is PROPOSED until it is explicitly promoted through the architecture/evidence process.

## Verified historical baseline

### Package 0

Primary evidence establishes a frozen primitive core of exactly six global primitives:

- Principle
- EvidenceObject
- BehavioralContract
- ACP
- CapabilityProof
- Box

The verified Package 0 freeze is 167/167 tests: 143 primitive tests plus 24 cross-primitive integration-audit tests.

### Package 1

Primary evidence establishes Environment and EnvironmentRepository.

Verified Package 1 behavior includes Environment lifecycle/state behavior, ordered lineage, navigation/theme references, snapshot conversion, and an EnvironmentRepository abstraction.

EnvironmentRepository is an in-memory snapshot repository. Cross-process/disk persistence is not established as a Package 1 runtime capability.

No MacProposal, MacContext, MacIntentRequest, or EnvironmentRuntime gating mechanism is established in the verified P0/P1 implementation.

### WorkflowPattern

WorkflowPattern is VERIFIED as a real P0-level concept in the narrow sense that it is a live `BOX_CANDIDATE_TYPES` value and is exercised by a real Box test. No separate WorkflowPattern class or broader structural contract is established by the verified P0 source.

### ArchiveProjection / Package 2

ArchiveProjection is a verified read-only historical projection layer over P0/P1 getters.

The label `Package 2 = Archive Historical Projection / ArchiveProjection` is VERIFIED as an explicit, deliberate in-conversation authorization and implementation label. The assignment followed a documented specification-recovery chain and was not merely inferred from chronological order.

This verified label assignment does not establish a continuous pre-conversation Package 2 lineage. That broader historical continuity remains UNRESOLVED.

P0-era durable-export/process-kill-recovery references to `Package 2` are VERIFIED as illustrative free-text fixture content only. They do not constrain an executable code path and do not establish a competing Package 2 architecture.

DESS appears in one P0-era ACP test fixture associated in free text with `Package 3`. That occurrence is VERIFIED as fixture text, but DESS package identity remains UNRESOLVED as architecture. No verified first-party P0/P1 source establishes DESS as Package 2 architecture.

The durable-export fixture narrative, the DESS fixture narrative, and ArchiveProjection are not to be collapsed into one historical specification without additional primary evidence.

## Smallest safe Package 2 statement

Within the verified construction record, Package 2 was explicitly and deliberately assigned to Archive Historical Projection / ArchiveProjection and was built and frozen under that label. Earlier P0 fixtures contain informal Package 2 and Package 3 narrative examples, but those examples are placeholder prose rather than executable package specifications. Whether the ArchiveProjection label corresponds to an architecture that existed before the verified construction record remains UNRESOLVED.

## Current architecture versus historical reconstruction

Current VaultOS architecture may include later validated concepts such as Action IR, runtime authorization, durable Runtime State, MAC proposal/execution separation, provenance, memory governance, external-effect reconciliation, and other ACP-derived mechanisms.

Their present architectural validity does not establish that they were historical Package 0/1/2 implementation facts.

Architecture evolution and historical reconstruction are separate truth domains.

## Promotion rule

A historical claim is classified as one of:

- VERIFIED
- UNRESOLVED
- CONTRADICTED

Architecture may advance from verified evidence and independently validated new engineering. It must not manufacture historical continuity for convenience.

## Repository custody

Google Drive checkpoint evidence is independently reviewed before accepted material is incorporated into this repository. GitHub is a downstream VaultOS architecture/implementation surface, not evidence that an upstream historical claim was true.
