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

### ArchiveProjection

ArchiveProjection is a verified read-only historical projection layer over P0/P1 getters. Its implementation existence and behavior are established; its canonical Package 2 placement is not.

### Package 2

Package 2 historical identity remains unresolved.

Primary evidence establishes that:

- WorkflowPattern and DESS terminology predate ArchiveProjection work;
- a pre-existing fixture explicitly associates DESS with Package 3 rather than Package 2;
- P0-era fixtures use Package 2 language around durable-export/process-kill-recovery behavior;
- the relationship between those fixtures, ArchiveProjection, and later MAC-composition narratives remains unresolved.

No unresolved candidate may be silently promoted to canonical Package 2 merely to make the timeline cleaner.

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
