

## Default env vars

`GITHUB_WORKSPACE` - default working dir on runner for steps, and default location of repository
when using eht `checkout` action. For example `/home/runner/work/my-repo-name/my-repo-name`. By default no source is present here, you must use `@actions/checkout` to actually pull your source code here.

`GITHUB_ACTION` - name of action currently running, or `id` of a step.

`GITHUB_JOB` - job_id of the current job.

`GITHUB_REF` - fully formed ref of branch or tag that triggered the workflow run.

Sub cases:
1. `push` - `GITHUB_REF` is branch or tag ref that was pushed.
2. `pull_request` - `GITHUB_REF` is pull request merge branch
3. `release` - ref is release tag created.

`GITHUB_EVENT_PATH` - path to file on runner, that contains full event webhook payload. for e.g. `/github/workflow/event.json`.

`GITHUB_RUN_ID` - unique number for workflow run, does not change if you re-run workflow run. GITHUB_RUN_NUMBER is associated with this run-id and bumps on re-run.

`GITHUB_PATH` - file to which paths can be appended for system path update, this will be visible to subsequent actions/steps.

## GITHUB_ENV file

you can make env variable available in any subsequent steps by updating the env variable
and writing this to `GITHUB_ENV` file.




