# Automation Boundaries

Status: operational governance

## Automation may

- create deterministic checks;
- lint repository structure and required records;
- compare revisions and test outputs;
- generate artifacts and evidence manifests;
- classify work into candidate queues using explicit rules;
- open or update issues when a workflow discovers a bounded condition;
- block or flag changes through checks where repository settings permit;
- preserve provenance, hashes, timestamps, and source references;
- trigger independent test execution through defined interfaces.

## Automation may not

- authorize architecture change merely because a check passes;
- erase contradictory evidence;
- rewrite historical test outcomes;
- infer empirical truth from specification text alone;
- self-promote a finding into architecture;
- collapse MAC, Peaches, Gauntlet, evaluator, and architecture roles into one authority;
- bypass human-presence requirements, credentials, or explicit governance gates.

## Mutation classes

LOW CONSEQUENCE: documentation formatting, index maintenance, deterministic metadata synchronization.

BOUNDED CONSEQUENCE: issue formation, candidate classification, non-authoritative evidence packaging, test execution.

HIGH CONSEQUENCE: merge gates, release generation, deployment approval, architecture baseline changes.

High-consequence automation requires explicit observable conditions, reversible execution where possible, provenance, and independent verification.

## Failure behavior

Automation failure SHALL fail visibly. Silent fallback that changes semantics is prohibited.

A workflow that cannot determine a result should return UNCERTAIN or BLOCKED rather than manufacturing PASS.
