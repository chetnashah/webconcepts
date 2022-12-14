

## Workflows can run, even when they are not merged to main/master

## If a workflow triggers on a push, but the workflow actions also commit & push, will there be an infinite loop?

This can be prevented by checking `author/actor` that did the push, or using a token with restrictions, that does the push from within the action/workflow.

https://github.com/orgs/community/discussions/26970