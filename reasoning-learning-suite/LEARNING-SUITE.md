# Reasoning Learning Suite Contract

## Objective

Improve the architect/orchestrator's operational reasoning inside GitHub environments by learning from observed tool behavior, agent behavior, execution timing, evidence quality, failure recovery, and competing execution routes.

## Dual evaluation

Every operation is evaluated on two axes:

1. Product result — did the requested work become physically true?
2. Procedure result — was the route efficient, reliable, observable, and appropriately verified?

A product PASS with a poor route may still generate a procedure correction. A fast route with weak evidence is not considered successful.

## Procedure descent record

Each meaningful operation cluster SHOULD capture:

`goal -> starting_state -> route -> input_shape -> tools_or_agents -> expected_latency -> actual_latency -> verification_cost -> recovery_cost -> quality -> friction -> ambiguity -> hole -> repair -> evidence -> product_outcome -> procedure_outcome -> reusable_rule -> negative_rule -> next_experiment`

Missing performance measurements are missing evidence, never zero-cost evidence.

## Measured efficiency

`EFFICIENT` is a comparative claim, not a synonym for `PASS`.

A route may be called efficient only when:

- all route steps have measured latency and verification cost;
- recovery cost is recorded;
- correctness, evidence quality, and result reliability are measured on a normalized 0..1 scale;
- the route participates in a named comparison experiment with at least one materially different route variant for the same question or task condition;
- the compared routes are verified against equivalent source evidence.

The analyzer flags `EFFICIENT` claims that lack complete measurement or a comparison experiment.

## Route comparison

The suite avoids inventing arbitrary weighted scores as its first method. It uses Pareto comparison across:

Lower is better:

`total latency | call count | verification cost | recovery cost`

Higher is better:

`correctness | evidence quality | result reliability`

A route dominates another only when it is no worse on every measured dimension and strictly better on at least one. If one route is faster while another has stronger evidence, the result is a tradeoff rather than a fake universal winner.

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
- A single successful observation cannot establish a default routing rule.

## Learning promotion

Reusable rules begin in `OBSERVE`.

The analyzer may classify a rule as a `CANDIDATE` only after at least three observations, at least two fully measured observations, and no known FAIL/FAULTY/INEFFICIENT observation associated with that rule. `CANDIDATE` still does not mean automatic default adoption.

Possible run dispositions remain:

`OBSERVE | RETEST | ADOPT_LOCAL | ADOPT_DEFAULT | REJECT | SUPERSEDE`

Default adoption requires architect evaluation of the candidate evidence and can be reversed when later measurements contradict the rule.

## Anti-bureaucracy constraint

Do not create a new permanent schema, workflow, agent, or checkpoint unless it changes behavior, authority, evidence, lifecycle, causality, reversibility, or measurable efficiency. Prefer extending the learning record and analyzer before adding structure.
