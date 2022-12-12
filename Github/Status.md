
There are two types of status checks on GitHub:

1. Checks [here](Checks.md)
2. Statuses (this doc)

## Statuses

These are more common.

The Commit status API allows external services to mark commits with a status, which is then reflected in pull requests involving those commits.

The Commit status API allows external services to mark commits with an `error`,`failure`, `pending`, or `success` state, which is then reflected in pull requests involving those commits. 

Statuses can also include an optional `description` and `target_url`, and we highly recommend providing them as they make statuses much more useful in the GitHub UI.

The target_url would be the full URL to the build output, and the description would be the high level summary of what happened with the build.

More details can be provided via "Checks" feature