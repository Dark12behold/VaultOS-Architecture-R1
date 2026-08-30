# Control Lexicon

Status: operational language grammar

## Purpose

Precise language reduces ambiguity between user intent, agent interpretation, automation, evaluation, and deployment. These terms are control words, not conversational decoration.

## Intent verbs

OBSERVE — record what happened without silently converting interpretation into fact.

DEFINE — state the required behavior, boundary, object, or question.

DISCOVER — investigate an unknown; may legitimately return KNOWLEDGE_GAP.

COMPARE — evaluate differences without implying preference or authority.

CLASSIFY — assign an item to an existing category using explicit criteria.

PROPOSE — form a candidate change or action; does not authorize execution.

SIMULATE — evaluate expected behavior without committing production state.

BUILD — create implementation or artifact according to an existing governing target.

EXECUTE — perform an authorized operation.

VERIFY — compare observed result against explicit expected behavior.

FALSIFY — attempt to demonstrate that a claim or hypothesis does not hold.

EVALUATE — independently judge evidence and behavior against criteria.

PROMOTE — move a validated local result toward a higher governed status; never implied by success alone.

AUTHORIZE — grant permission for a bounded action; does not prove truth or success.

COMMIT — make an accepted state mutation durable and versioned.

RELEASE — publish a verified artifact or milestone under release policy.

DEPLOY — introduce a released artifact into an execution environment under deployment policy.

ROLLBACK — restore a prior governed state after failure, contradiction, or revoked authorization.

RETIRE — remove a mechanism from active use while preserving lineage and evidence when required.

## State words

PROPOSED — formed but not authorized.

READY — prerequisites are satisfied; execution has not necessarily begun.

RUNNING — execution is in progress.

PASS — evaluated behavior satisfied the scoped criteria under recorded conditions.

FAIL — evaluated behavior violated scoped criteria under recorded conditions.

UNCERTAIN — evidence is insufficient or contradictory.

BLOCKED — a required dependency, authority, resource, or external condition is unavailable.

INCOMPLETE — known required work remains.

COMPLETE — all required actions for the current governed step have executed and required evidence verifies the expected result.

STALE — previously valid information may no longer satisfy temporal validity requirements.

SUPERSEDED — replaced by a newer governed record while historical truth remains preserved.

## Relationship words

DEPENDS_ON — cannot validly complete without the referenced prerequisite.

BLOCKS — prevents a dependent action from becoming eligible.

ENABLES — makes a capability or action possible but does not require its use.

CONSTRAINS — limits valid behavior or solution space.

CAUSES — supported causal relationship; stronger than correlation.

CORRELATES_WITH — observed association without sufficient causal proof.

AMPLIFIES — increases magnitude or effect of another factor.

DAMPENS — reduces magnitude or effect of another factor.

COUPLES_WITH — behavior interacts through a compatible mechanism or shared state.

CONTRADICTS — cannot simultaneously remain true under the same stated conditions without resolution.

DERIVES_FROM — generated from a source through a recorded transformation.

VERIFIES — supplies evidence sufficient for a scoped verification claim.

## Efficiency language

REUSE — use an existing component without semantic change.

COMPOSE — combine existing components while preserving their distinct roles.

MERGE — collapse materially duplicate mechanisms into one representation.

EXTEND — add bounded behavior to an existing mechanism.

REPLACE — remove a weaker mechanism in favor of a more effective one.

NEW — create a genuinely new permanent component only after the prior options fail.

## Recommended instruction syntax

A high-quality instruction should specify, when relevant:

INTENT: desired outcome.
SCOPE: what is and is not included.
SOURCE OF TRUTH: governing artifact or authority.
STARTING STATE: known current state.
CONSTRAINTS: protected limits.
AVAILABLE RESOURCES: host/agent capabilities that may be exploited.
DEPENDENCIES: prerequisites.
PARALLELIZABLE WORK: independent tasks allowed to run concurrently.
EXPECTED OUTPUT: artifact, state, or behavior.
EVIDENCE REQUIRED: what proves success.
COMPLETION CONDITION: precise condition that unlocks the next dependent step.
FAILURE / UNCERTAINTY RESPONSE: repair, retry, block, escalate, or investigate.
COST PREFERENCE: preferred compute/operator budget or free-first requirement.
REVERSIBILITY: rollback expectation.

## Compact command grammar

For routine work, the following shorthand is sufficient:

INTENT -> SCOPE -> CONSTRAINTS -> USE EXISTING CAPABILITIES -> EXECUTE -> VERIFY -> COMPLETE/BLOCKED/UNCERTAIN

For novel or consequential work:

OBSERVE -> DEFINE -> DISCOVER -> HYPOTHESIZE -> FALSIFY -> PROPOSE -> EVALUATE -> AUTHORIZE -> EXECUTE -> VERIFY -> PRESERVE EVIDENCE -> PROMOTION REVIEW

## Language rule

Words that imply different authority or epistemic states SHALL NOT be treated as synonyms. In particular:

proposal != authorization
execution != success
confidence != evidence
implementation != verification
PASS != architectural promotion
user authority != empirical truth
