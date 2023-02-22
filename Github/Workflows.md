

## Which workflow version will be used?

All triggers have an associated `GITHUB_REF` which would be used.

e.g. 
1. `push` event will use updated ref.
2. `pull_request` event will use PR merge branch: refs/pull/:prnumber/merge
3. `workflow_dispatch`: branch or tag that received the dispatch

## Schedule workflows trigger from default branch

You can view default branch under "branches" UI in github.

## Workflows can run, even when they are not merged to main/master



## If a workflow triggers on a push, but the workflow actions also commit & push, will there be an infinite loop?

This can be prevented by checking `author/actor` that did the push, or using a token with restrictions, that does the push from within the action/workflow.

https://github.com/orgs/community/discussions/26970