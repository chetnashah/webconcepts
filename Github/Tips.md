
## Find user given a PAT/token

```
GH_TOKEN=patvalue gh api -H "Accept: application/vnd.github+json" /user
```

## Cherry pick all commits in a PR

```sh
gh pr diff -- patch PRNUMBER | git am
```

## What is `refs/pull/prnumber/merge`?
The `refs/pull/<number>/merge` is a reference created by GitHub to keep track of what would happen if a pull request was merged. It references the merge commit between `refs/pull/<number>/head` and the destination branch (e.g. `master`).

You can think of it as a "future" commit. GitHub (as well as other Git-based collaboration platforms) use this technique to determine whether the pull request would successfully merge with all the checks passing and no merge conflicts.

When you view a pull request, you’re seeing what the resultant merge commit will actually look like. We do this by actually creating a merge commit behind the scenes, and showing you the difference between it and the tip of the target branch.

https://blog.developer.atlassian.com/a-better-pull-request/

