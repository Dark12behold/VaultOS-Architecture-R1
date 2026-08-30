# Design Workflow Pattern

Status: operational workflow grammar

## Purpose

This pattern turns broad design intent into a controlled, low-waste development path that exploits the host environment first, preserves evidence, and prevents conversational planning from outrunning physical repository state.

## Core pattern

1. RECEIVE INTENT
2. MAP TOPOGRAPHY
3. IDENTIFY EXISTING CAPABILITIES
4. COLLAPSE REDUNDANCY
5. FORM MINIMUM ACTION PLAN
6. RESOLVE DEPENDENCIES
7. SEPARATE PARALLEL FROM SEQUENTIAL WORK
8. EXECUTE LOWEST-COST RELIABLE PATH
9. OBSERVE HOST STATE
10. VERIFY REQUIRED OUTPUTS
11. CLASSIFY COMPLETE / INCOMPLETE / BLOCKED / UNCERTAIN
12. ONLY THEN FORM DEPENDENT NEXT STEP
13. PRESERVE LESSONS THAT SHOULD SURVIVE THE STEP

## Input quality pattern

The preferred design input is not “build X.” It is:

- desired behavior;
- governing constraints;
- current state;
- reusable mechanisms already known;
- host resources available;
- cost preference;
- evidence threshold;
- completion condition;
- acceptable uncertainty;
- rollback or containment expectation.

The agent is responsible for discovering missing implementation detail where the host environment exposes it directly.

## Decision compression

For each proposed component, ask:

A. Does this capability already exist?
B. Can existing components compose to satisfy it?
C. Are two components making the same decision?
D. Does the new distinction create a unique authority, evidence, failure, or lifecycle boundary?
E. Can the behavior be made ephemeral instead of permanent?
F. Can automation perform this reliably enough that conversational supervision is unnecessary?

If A/B/C indicate reuse or duplication, prefer consolidation. If D is false, a new permanent structure is presumptively unnecessary.

## Execution classes

### Deterministic host work
Examples: file checks, schema lint, hashes, dependency comparison, labels, routing, artifact generation.
Default: automate in GitHub Actions.

### Agent judgment work
Examples: architecture interpretation, issue classification under ambiguity, synthesis, diagnosis, design alternatives.
Default: agent proposes structured output; independent evaluator or deterministic checks validate what can be validated.

### Human authority work
Examples: credentials, ownership changes, high-consequence release authorization, constitutional changes.
Default: preserve explicit human gate.

### Experimental work
Examples: unknown mechanism, new algorithm, new hardware behavior, uncertain coupling.
Default: isolate, define falsification, preserve negative results, do not promote from one successful run.

## Cost-first compute routing

Use the cheapest layer capable of producing trustworthy evidence:

1. static file/schema checks;
2. shell/native runner utilities;
3. repository metadata APIs;
4. dependency/security graph features;
5. small deterministic scripts;
6. hosted agent/model reasoning;
7. interactive development environments;
8. external paid compute only when lower layers cannot satisfy the task.

Do not use an expensive reasoning or execution layer to perform a deterministic operation already provided by the host.

## Step synchronization

A dependent next step remains QUEUED INTENT until the current step is VERIFIED COMPLETE.

COMPLETE requires:

- required writes/actions executed;
- required workflows finished;
- required checks are PASS;
- expected artifacts/state exist;
- evidence corresponds to the intended scope;
- no unresolved blocking result remains.

If any of these are missing, the response is INCOMPLETE, BLOCKED, or UNCERTAIN.

## Learning loop

ACTION -> RESULT -> DELTA -> LESSON -> REUSE / CORRECT / GENERALIZE / COLLAPSE

The system should become denser rather than merely larger. Repeated work patterns should migrate toward reusable host-native automation. Repeated failures should migrate toward checks, tests, or Gauntlet obligations. Repeated redundant decisions should migrate toward consolidation.

## Desired response format from the agent

When reporting a governed step, prefer:

CURRENT STEP: what is being completed.
HOST STATE: what GitHub physically reports.
ACTION TAKEN: what changed.
VERIFICATION: what proved or failed to prove the result.
STATUS: COMPLETE / INCOMPLETE / BLOCKED / UNCERTAIN.
REDUNDANCY FINDING: reuse, merge, or simplification opportunity if one exists.
NEXT ELIGIBLE ACTION: only work unlocked by the verified state.
