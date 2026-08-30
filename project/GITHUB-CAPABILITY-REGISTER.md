# GitHub Capability Register

Status: live operational reference

## Confirmed repository-native resources

- Repository contents/history: active.
- Issues: active.
- Pull requests: active; none open at initial inspection.
- GitHub Actions: active; workflows can be written and runs are observable.
- Checks/statuses: observable.
- Releases: supported by GitHub; none existed at initial inspection.
- Rulesets: supported by GitHub; none existed at initial inspection.
- Projects: enabled on repository, but current connector does not expose Project mutation APIs.

## Confirmed connector write authority

The installed integration exposes write access for contents, workflows/Actions, issues, and pull requests. It exposes read access for checks/statuses and several repository surfaces.

## Current connector limitations

At initial inspection, the connector did not expose direct mutation for:

- repository creation;
- GitHub Projects configuration/fields/views;
- branch protection/ruleset creation;
- Pages configuration;
- Environments/deployment protection configuration;
- selected security/dependency endpoints through the generic fetch surface.

These are capability-access limitations of the current integration, not claims that GitHub lacks the feature.

## Operating rule

When a native GitHub capability is useful but not mutable through the connector:

1. encode the desired state in repository policy/configuration where possible;
2. identify the minimum one-time human/UI action required;
3. avoid building a duplicate custom subsystem merely because the connector cannot flip the native switch;
4. re-check connector capability periodically before assuming the limitation remains.

## Initial observed state

- `main` existed and was not reported as protected.
- no repository rulesets were present.
- no releases were present.
- no Actions runs existed before workflow installation.
- no `.github/` automation structure existed before this action-suite setup.
