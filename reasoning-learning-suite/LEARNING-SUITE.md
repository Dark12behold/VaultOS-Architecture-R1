# Reasoning Learning Suite Contract

## Objective

Improve the architect/orchestrator's operational reasoning inside GitHub environments by learning from observed tool behavior, agent behavior, execution timing, evidence quality, and failure recovery.

## Dual evaluation

Every operation is evaluated on two axes:

1. Product result — did the requested work become physically true?
2. Procedure result — was the route efficient, reliable, observable, and appropriately verified?

A product PASS with a poor route may still generate a procedure correction. A fast route with weak evidence is not considered successful.

## Procedure descent record

Each meaningful operation cluster SHOULD capture:

`goal -> starting_state -> route -> input_shape -> tools_or_agents -> expected_latency -> actual_latency -> friction -> ambiguity -> hole -> repair -> evidence -> product_outcome -> procedure_outcome -> reusable_rule -> negative_rule -> next_experiment`

## Agent performance fingerprint

For each agent/tool and task class, learn:

`task_class -> preferred_input_representation -> preferred_granularity -> context_tolerance -> latency_distribution -> failure_modes -> result_quality -> verification_cost -> blocking_class -> confidence`

No profile is assumed permanent. Profiles are empirical and versioned by observation.

## Synchronization classes

- `BLOCKING`: dependent work cannot proceed without this result.
- `ADVISORY`: work may proceed; result informs later correction.
- `SPECULATIVE`: parallel exploration with no authority to unlock consequential action.
- `JOIN_REQUIRED`: independent branches may proceed but must converge before a named gate.
- `NEVER_SYNC_UNTIL_GATE`: preserve independence until a later comparison/evaluation point.
- `CANCEL_ON_FALSIFICATION`: terminate expensive work if cheaper evidence already falsifies the candidate.

Synchronization is a dependency property, not a universal workflow property.

## Routing priority

Prefer the least expensive adequate mechanism:

`static/native check -> deterministic local code -> repository API -> GitHub-native facility -> bounded agent/model -> external compute/service`

Escalate only when the lower layer cannot answer the question with sufficient evidence.

## Evidence rules

- Host/workflow success is not subject success.
- Missing subject is a typed state, not success.
- Evaluator self-test precedes subject evaluation where practical.
- Evidence must survive skipped, blocked, and failing execution.
- Tool output is an observation; architect conclusion is separate.
- External source evidence reduces ambiguity but does not validate local behavior.

## Learning promotion

A procedural observation becomes a reusable routing rule only after at least one successful local application and no known contradiction. Higher-impact rules should accumulate repeated observations across task classes before becoming default behavior.

Possible dispositions:

`OBSERVE | RETEST | ADOPT_LOCAL | ADOPT_DEFAULT | REJECT | SUPERSEDE`

## Anti-bureaucracy constraint

Do not create a new permanent schema, workflow, agent, or checkpoint unless it changes behavior, authority, evidence, lifecycle, causality, reversibility, or measurable efficiency. Prefer extending the learning record and analyzer before adding structure.
