# VaultOS Architecture R1

VaultOS R1 is the first governed, testable architecture/build baseline for the VaultOS/MAC system.

R1 is intentionally allowed to contain known, suspected, and undiscovered inadequacies. Its purpose is not to appear finished before reality can test it. Its purpose is to provide a coherent structure that can be implemented, observed, evaluated, corrected, and inherited into R2.

## Development model

`R1 -> Observe -> Issue -> Evaluate -> Diagnose -> Correct / Experiment -> Verify -> Finding -> Inheritance Decision -> R2`

Descendant revisions grow by evidence-directed inheritance rather than chaotic redesign. Successful structure is preserved; demonstrated defects are corrected; useful discoveries may be generalized; unnecessary complexity may be collapsed; unresolved uncertainty remains visible.

The human analogy used during design is developmental: a child grows through observation, guidance, consequences, learning, and retained lessons rather than being rebuilt into a different child after every mistake. Public engineering structures translate that analogy into precise architecture, evidence, issue, evaluation, correction, and inheritance records.

## Repository authority

This repository is the durable architecture and R1 evidence structure. GitHub Issues and Projects are operational organization surfaces over the repository; they do not replace architectural authority or evidentiary truth.

Architecture, implementation, and evidence remain distinct truth domains. A specification is not proof of implementation. Implementation is not proof of correct behavior. Confidence or agreement is not evidence.

## Current structure

- `architecture/` — governing architecture and developmental rules
- `schemas/` — structured records used to capture observable information without prematurely interpreting it
- `project/` — work topology, dependency map, and issue-box conventions for GitHub Projects
- `evidence/` — evidence organization and provenance conventions
- `findings/` — validated failures, limitations, contradictions, discoveries, and lessons
- `acp/` — governed architecture-change proposals and dispositions

## R1 rule

> The purpose of R1 is to give reality something coherent to correct.

R2 is not predesigned as an idealized replacement. Its delta is derived from validated R1 findings while preserving successful inherited structure and causal legibility.
