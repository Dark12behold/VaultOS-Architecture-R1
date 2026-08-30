# Procurement Gate

Status: operational policy

## Purpose

Treat external dependencies, tools, models, packages, containers, services, and hardware integrations as governed acquisitions rather than casual additions.

## Intake

A procurement candidate SHOULD identify:

- requested capability;
- candidate dependency/tool/service;
- why existing capabilities are insufficient;
- version/source;
- license/rights constraints;
- security/vulnerability state;
- maintenance activity and abandonment risk;
- transitive dependencies;
- data/privacy implications;
- runtime permissions;
- network requirements;
- cost/quota constraints;
- portability/vendor lock-in;
- fallback/substitution path;
- verification method.

## Decision path

`NEED -> SEARCH/REUSE -> CANDIDATE -> DEPENDENCY/SECURITY REVIEW -> RIGHTS/COST/PRIVACY REVIEW -> TEST -> EVIDENCE -> ACCEPT / SUBSTITUTE / DEFER / REJECT`

## Rules

A package install is implementation activity, not procurement approval.

A popular dependency is not automatically trusted.

A vulnerability finding is evidence of risk, not automatically proof of exploitability in the current system.

A dependency accepted today may be reevaluated later as new vulnerabilities, maintenance failures, costs, or better substitutes emerge.

## Gauntlet feedback

Security, compatibility, or failure findings discovered after procurement SHOULD be evaluated for promotion into the independent Gauntlet queue so future replacements and descendants inherit the lesson rather than merely the patch.
