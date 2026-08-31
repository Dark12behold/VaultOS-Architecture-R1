# VaultOS Custody and Promotion Pipeline

Status: ACTIVE
Date: 2026-08-31

## Custody model

VaultOS uses intentionally separated engineering surfaces.

```text
Claude workspace
    -> Google Drive checkpoint
    -> independent review / reconciliation
    -> ACCEPT | HOLD UNRESOLVED | REJECT
    -> accepted architecture or implementation material
    -> GitHub
```

## Claude boundary

Claude's engineering surface is its own workspace plus Google Drive checkpoints.

Claude does not inspect, verify, modify, commit to, or otherwise use GitHub as shared state.

## GitHub boundary

GitHub is maintained downstream after Drive evidence is reviewed.

A GitHub commit does not retroactively validate a Drive claim. Repository implementation is a realization of accepted architecture, not the source of historical truth.

## Checkpoint acceptance

Before Drive-derived work is promoted downstream, review should establish as applicable:

- checkpoint identity;
- readable/intact content;
- reported byte/checksum relationship where available;
- claimed test/build state and the limits of what can be independently reproduced;
- architecture placement;
- provenance and dependencies;
- contradictions with stronger existing evidence.

Possible decisions:

- ACCEPT
- HOLD_UNRESOLVED
- REJECT

Only accepted material proceeds to repository realization.

## Architecture-first rule

Validated generalizable discoveries are incorporated into the architecture/specification layer before downstream repository implementation.

```text
verified evidence / experiment
    -> architecture change
    -> architecture consistency review
    -> accepted architecture
    -> implementation
    -> implementation verification
```

Code does not silently redefine architecture merely because it exists or passes a test.

## Truth-domain separation

Maintain separate claims for:

1. Architectural truth: what VaultOS currently specifies.
2. Implementation truth: what a repository/workspace actually implements.
3. Evidentiary truth: what tests, checkpoints, manifests, experiments, or observations establish.
4. Historical truth: what primary evidence establishes about earlier package states.

These domains may reference one another but are not interchangeable.

## Checksum relationship

Where a Drive artifact supplies a verified checksum, preserve that identifier in the downstream promotion record. A later repository file may intentionally differ because of integration or formatting; if so, record both the upstream artifact checksum and downstream repository revision rather than pretending they are byte-identical.

## Conflict rule

When a new artifact conflicts with established higher-quality evidence:

```text
STOP promotion
-> preserve both claims
-> classify the conflict
-> investigate primary evidence
-> resolve or retain UNRESOLVED
```

Do not patch the conflict with an inferred narrative.
