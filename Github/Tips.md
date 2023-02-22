
## Find user given a PAT/token

```
GH_TOKEN=patvalue gh api -H "Accept: application/vnd.github+json" /user
```

## Cherry pick all commits in a PR

```sh
gh pr diff -- patch PRNUMBER | git am
```

