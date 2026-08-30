# Reasoning Topography

Status: operational design map

## Purpose

This map defines how an agent should reason about an available host environment before adding work, code, process, or infrastructure. The objective is maximum useful capability per unit of permanent complexity, time, compute, and operator effort.

The environment is treated as a capability landscape rather than a passive storage location.

## Topographic scan

For every meaningful task, inspect the host environment through these layers:

1. NATIVE CAPABILITY — what the host already provides directly.
2. CONNECTOR CAPABILITY — what the current agent can actually invoke.
3. AUTOMATION CAPABILITY — what can execute without conversational supervision.
4. OBSERVATION CAPABILITY — what state, logs, artifacts, checks, and events can be read back.
5. CONTROL CAPABILITY — what can block, route, classify, retry, gate, or sequence work.
6. EVIDENCE CAPABILITY — what can preserve provenance, hashes, run identity, and historical results.
7. COST SURFACE — what is free, metered, quota-limited, or operator-expensive.
8. AUTHORITY SURFACE — what the agent may propose, execute, verify, or must escalate.
9. FAILURE SURFACE — what can silently fail, partially complete, race, expire, or become stale.
10. EXTENSION SURFACE — what missing behavior can be cheaply composed from existing host primitives.

## Mandatory reasoning order

ENVIRONMENT -> CAPABILITIES -> CONSTRAINTS -> REUSE -> COMPOSE -> MERGE -> EXTEND -> NEW

Do not begin with NEW.

Before introducing a new component, determine whether the desired behavior can be produced by:

- reusing one existing mechanism;
- composing two or more existing mechanisms;
- merging duplicate control paths;
- extending an existing workflow or schema;
- replacing a weaker mechanism with a denser one.

Only create a new permanent component when the distinction produces meaningful additional behavior, evidence, authority separation, or lifecycle control.

## Scale bands

### L0 — Event
A single input, webhook, issue, commit, run, finding, or user instruction.

### L1 — Action
One bounded operation such as classify, validate, build, test, package, or route.

### L2 — Workflow
A sequence of actions with entry conditions and completion evidence.

### L3 — Agent group
A persistent responsibility domain such as Task Former, Evaluator, Procurement, Peaches, Gauntlet, Release, or Evidence.

### L4 — Repository system
The complete local coordination surface: issues, workflows, checks, artifacts, releases, rules, and lineage.

### L5 — Cross-repository system
Architecture, implementation, Gauntlet, evidence, and release repositories linked by explicit contracts without collapsing authority.

### L6 — Ecosystem
GitHub plus external models, builders, runtime hosts, package registries, deployment targets, human governance, and future VaultOS execution environments.

An agent SHALL reason at the smallest scale that can solve the problem, while checking one level above for dependency and one level below for observability.

## Topographic questions

Before action, ask:

- Where is the source of truth for this claim?
- Which host primitive already performs part of this job?
- Which agent/group owns proposal, execution, evaluation, and evidence?
- What observable event proves this step began?
- What observable event proves it completed?
- What artifact or state proves the result?
- What can run in parallel?
- What is truly dependent?
- What expires or becomes stale with time?
- What is the cheapest reliable execution path?
- What should remain ephemeral rather than permanent?
- What can be collapsed after the system learns from it?

## Governing optimization target

MINIMUM PERMANENT STRUCTURE
+ MAXIMUM NATIVE HOST LEVERAGE
+ MAXIMUM OBSERVABILITY
+ SUFFICIENT INDEPENDENT VERIFICATION
+ LOWEST REASONABLE COMPUTE / OPERATOR COST
= PREFERRED SYSTEM PATH

## Anti-bureaucracy rule

A new checkpoint that repeats an existing decision without adding a new evidence class, authority boundary, failure detector, or lifecycle distinction is presumed redundant.

The agent should explicitly recommend consolidation when a proposed rule or task duplicates an existing logic stream.
