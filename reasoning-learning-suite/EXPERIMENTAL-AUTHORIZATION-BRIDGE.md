# Experimental Human Authorization Bridge

Status: EXPERIMENTAL / NOT YET PROMOTED

Purpose: test whether the architect can navigate as far as possible through available GitHub/host topology, identify the smallest remaining user-only action, present an exact operator prompt, verify the resulting state, and continue without unnecessary manual steps.

This is a mechanics experiment for the ChatGPT Reasoning Learning Suite. It is not VaultOS architecture and should not be treated as a permanent default until exercised and measured.

## Control rule

`DISCOVER -> MAP -> ATTEMPT AUTHORIZED ROUTE -> CLASSIFY BLOCKER -> FORM MINIMAL USER ACTION -> USER ACTS/AUTHORIZES -> VERIFY STATE -> CONTINUE -> RECORD FRICTION`

The user is never asked to provide passwords, session cookies, access tokens, recovery codes, or MFA secrets. Authentication remains between the user and the host.

## Capability states

- `INVOKABLE`: current tool/connector can perform the action directly.
- `ADDRESSABLE`: action route or host surface is known, but current execution surface cannot invoke it.
- `USER_AUTHORIZATION_REQUIRED`: host deliberately requires user consent/identity confirmation.
- `USER_EXECUTION_REQUIRED`: exact action is known but current tools cannot perform it.
- `UNDISCOVERED`: route has not yet been mapped.
- `ABSENT`: evidence indicates the capability is unavailable in the current host/account/tool configuration.

## Minimal handoff packet

When user action is required, the architect should produce only:

1. action name;
2. exact host location or legitimate deep link when available;
3. exact values/options to choose;
4. why the action is required;
5. what not to enable/change;
6. expected observable state after completion;
7. automatic verification step the architect will perform next.

## Experimental GitHub setup path

### Phase A — Dedicated reasoning workspace repository

User-only action candidate:

- Create repository: `ChatGPT-Reasoning-Learning-Suite`
- Owner: current GitHub account
- Visibility: public unless the user intentionally chooses otherwise
- Do not initialize with README, template, license, or starter code if an empty repository option is available.

Architect verification:

- search installed repositories for exact repository name;
- confirm GitHub App/connector access;
- migrate staged reasoning-learning-suite content preserving provenance;
- run self-tests before declaring migration complete.

### Phase B — GitHub App repository access

User-only action candidate when new repository is not visible:

- GitHub Settings -> Applications -> Installed GitHub Apps -> ChatGPT Codex Connector -> Configure
- Add the dedicated reasoning repository to the app installation, or choose the least-broad repository access setting that still covers intended development repositories.

Do not broaden access merely for convenience without a demonstrated need.

Architect verification:

- search installed repositories again;
- fetch repository metadata;
- perform a reversible read/write test on the dedicated workspace.

### Phase C — Codespaces environment-as-code experiment

Do not create a generic Codespace before the repository contains its environment definition.

Architect-authored repo configuration may include:

- `.devcontainer/devcontainer.json`
- deterministic setup scripts
- task/benchmark runners
- test commands
- evidence/result output locations
- documented non-secret environment variables

User-only action candidate after configuration is verified:

- Create a Codespace from the dedicated reasoning repository and intended branch.

Important current boundary:

- the GitHub connector presently exposes repository and Actions operations but no first-class Codespaces terminal/control operations;
- repository-defined scripts may still make Codespaces useful as a runtime realization of environment-as-code;
- direct interactive control must not be claimed until an actual authorized execution surface is demonstrated.

### Phase D — Actions and evidence

Prefer repository-defined GitHub Actions for repeatable execution where they are sufficient.

Expected uses:

- self-tests;
- analyzers;
- route comparison summaries;
- agent observation aggregation;
- build/evaluation evidence;
- periodic final reporting.

The learning suite should accumulate observations during real work and perform consolidated evaluation only at meaningful run completion or explicit periodic review. Inconclusive evidence should be archived without spawning unnecessary new experiments.

### Phase E — Optional host capabilities to evaluate later

Only configure when a real workload demonstrates value:

- Code security / dependency analysis;
- Packages for distributable artifacts;
- Pages for documentation/public presentation;
- additional GitHub Apps or repository permissions;
- scheduled workflows;
- additional hosted execution environments.

## Measurement

Each user handoff should record, when practical:

`blocker_class -> handoff_precision -> number_of_user_steps -> user_retries -> elapsed_handoff_time -> verification_calls -> success/failure -> resumed_without_clarification`

A better handoff reduces user effort without reducing authorization clarity or verification quality.

## Promotion gate

Do not promote this bridge into a default reasoning rule from documentation alone.

Promotion requires at minimum:

- one real user-action boundary exercised end-to-end;
- resulting host state independently verified;
- resumed work completed without hidden manual dependency;
- friction and failure modes recorded;
- no request for user secrets or unauthorized bypass;
- evidence that the handoff was materially cleaner than a generic settings walkthrough.

Until then: `OBSERVE / RETEST`.
