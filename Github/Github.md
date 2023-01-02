
https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions

### Events

Events are interesting triggers/events that trigger a workflow.

### Workflows

Workflow is a named sequence of steps that achieve a goal.
Configured workflows should live in `.github/workflows` folder.

a repository can have multiple workflows, each of which can perform a different set of tasks. For example, 1. you can have one workflow to build and test pull requests, 
2. another workflow to deploy your application every time a release is created, and still 
3. another workflow that adds a label every time someone opens a new issue.

### Job 

**A job is a set of steps in a workflow that execute on the same runner**. Each step is either a shell script that will be executed, or an action that will be run. **Steps are executed in order and are dependent on each other**. **Since each step is executed on the same runner, you can share data from one step to another**. For example, you can have a step that builds your application followed by a step that tests the application that was built.

**jobs have no dependencies and run in parallel with each other**. When a job takes a dependency on another job, it will wait for the dependent job to complete before it can run.

Job -> many steps.
Step -> many actions.

Everything inside a `job` runs on same runner and can share data.

### Action

An action is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task. Use an action to help reduce the amount of repetitive code that you write in your workflow files.

A workflow is made up many small actions (individual blocks) inside a workflow.

### Runners

A runner is a server that runs your workflows when they're triggered. Each runner can run a single job at a time.


### Envioronment variables

You can use environment variables to store information that you want to reference in your workflow. You reference environment variables within a workflow step or an action, and the variables are interpolated on the runner machine that runs your workflow. Commands that run in actions or workflow steps can create, read, and modify environment variables.

https://docs.github.com/en/actions/learn-github-actions/environment-variables#passing-values-between-steps-and-jobs-in-a-workflow


### Github actions in Nodejs

https://www.youtube.com/watch?v=Ef0gPGUh9oo

