# Agent-Specific Training Regime

## Purpose

The Reasoning Learning Suite MUST learn agents individually rather than assume one universal prompting, timing, context, or synchronization strategy.

Each agent/tool is treated as an empirical performer with its own operating profile. The objective is to discover how to obtain the strongest verified result from that actor with the least unnecessary latency, context, retries, and verification burden.

This regime does not retrain model weights. It trains the workspace routing layer by accumulating evidence about how each agent behaves under different task and input conditions.

## Training dimensions

For each agent and task class, vary only what is useful to distinguish behavior:

`representation -> granularity -> context volume -> vocabulary -> constraint density -> output contract -> synchronization class -> retry strategy`

Examples of representation include prose, schema, code, diff, image, table, checklist, or mixed packet.

Granularity is recorded as `micro | narrow | bounded | broad`.

Context volume is recorded as an observed size or coarse class, not guessed precision.

## Trial loop

Agent learning follows:

`TASK CLASS -> BASELINE INPUT -> AGENT EXECUTION -> VERIFY RESULT -> RECORD LATENCY/COST/QUALITY -> ALTER ONE OR FEW INPUT DIMENSIONS -> REPEAT WHEN NATURALLY JUSTIFIED -> COMPARE -> RETAIN LOCAL PROFILE`

Do not manufacture endless synthetic trials. Prefer real work. Deliberate comparative trials are justified when a routing ambiguity materially affects speed, quality, reliability, or cost.

## Agent profile dimensions

A mature profile may contain:

`agent_id -> task_class -> preferred_representation -> preferred_granularity -> useful_context_range -> vocabulary_notes -> constraint_tolerance -> typical_latency -> common_failure_modes -> retry_success_pattern -> verification_burden -> reliability -> best_sync_class -> negative_patterns`

Profiles remain conditional. An agent may prefer narrow diffs for code review while performing better with broad prose context for architecture synthesis.

## Speed learning

Speed is not raw response latency alone.

Effective agent cost includes:

`execution latency + retries + context preparation + verification + recovery + downstream ambiguity`

A faster response that requires more repair is not automatically a faster route.

## Training discipline

- Use equivalent evidence targets when comparing two input treatments.
- Do not promote a preference from one successful trial.
- Preserve negative results when they reveal a repeatable failure mode.
- Prefer changing one major input variable at a time when attribution matters.
- Allow multi-variable changes when the goal is practical route optimization rather than causal isolation, but label the comparison accordingly.
- Never infer a permanent personality or capability limit from a transient failure.
- Re-evaluate profiles after model/version/tool changes or after long intervals.
- Agent-specific learning may guide routing but never grants authority.

## Synchronization training

The suite also learns whether an agent should be blocking, advisory, speculative, join-required, never-sync-until-gate, or cancel-on-falsification for a task class.

The correct question is not "How fast is this agent?" but:

`When should this agent begin, what should it receive, what may proceed without it, when must its result join, and how long does its output remain useful?`

## Periodic evaluation

Agent observations may accumulate during normal work without launching separate training runs. At the end of a meaningful development run, or during an explicitly requested periodic suite review, the suite consolidates observations into candidate profiles.

If evidence is inconclusive, preserve the observations and make no routing mutation. A future review may revisit them.

## Promotion

An agent-specific preference may progress:

`OBSERVE -> RETEST -> LOCAL_CANDIDATE -> LOCAL_DEFAULT`

Promotion requires repeated evidence in the same task class, adequate measurement, no unresolved contradiction, and no quality degradation relative to alternatives.

A local default is reversible and scoped to the observed agent/version/tool surface and task class. It is not a universal claim about all agents or future versions.
