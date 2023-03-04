
https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions


## Access stuff

Your protected branch rules for your main branch won't be enforced on this private repository until you move to a GitHub Team or Enterprise organization account

### Personal account

Each personal account can be a member of multiple organizations.
Your personal account can own resources such as repositories, packages, and projects. 

Most people will use one personal account for all their work on GitHub.com, including both open source projects and paid employment. If you're currently using more than one personal account that you created for yourself, we suggest combining the accounts.

### Machine user

Personal accounts are intended for humans, but you can create accounts to automate activity on GitHub. This type of account is called a machine user. For example, you can create a machine user account to automate continuous integration (CI) workflows.



### Organizations

Organizations can be made under any of 3 plans:
* free
* Team
* Enterprise

Your team can collaborate on GitHub by using an organization account, which serves as a container for your shared work and gives the work a unique name and brand.

Each person that uses GitHub always signs into a personal account, and multiple personal accounts can collaborate on shared projects by joining the same organization account. A subset of these personal accounts can be given the role of organization owner, which allows those people to granularly manage access to the organization's resources using sophisticated security and administrative features.

**If an organization only has one owner, the organization's projects can become inaccessible if the owner is unreachable. To ensure that no one will lose access to a project, we recommend that at least two people within each organization have the owner role.**

### Teams

You can use teams to organize, mention, and manage access for people in an organization. 
* Organization owners and team maintainers can give teams admin, read, or write access to organization repositories. * Organization members can send a notification to an entire team by mentioning the team's name. Organization members can also send a notification to an entire team by requesting a review from that team. 
* Organization members can request reviews from specific teams with read access to the repository where the pull request is opened. 
* Teams can be designated as owners of certain types or areas of code in a CODEOWNERS file.



### Enterprise accounts

Enterprise accounts are a feature of GitHub Enterprise Cloud that allow owners to centrally manage policy and billing for multiple organizations. For more information, see the GitHub Enterprise Cloud documentation.



### Events

Events are interesting triggers/events that trigger a workflow.

### Workflows

Workflow is a named sequence of steps that achieve a goal.
Configured workflows should live in `.github/workflows` folder.

a repository can have multiple workflows, each of which can perform a different set of tasks. For example, 1. you can have one workflow to build and test pull requests, 
2. another workflow to deploy your application every time a release is created, and still 
3. another workflow that adds a label every time someone opens a new issue.

### Events

`pull_request` - only to do with PR entity, nothing to do with commit pushes. Important events in `pull_request` are: `opened`, `closed`, `synchronize`. The workflow will get the future merged commit as a ref.
`push` - only to do with commit pushes. You can specify branch filters on this event.

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

The code lives near to the action, and the action code looks like:
```yml
name: 'PR Thank You Action'
description: 'Gives thank you as a comment to a newly opened PR'

inputs:
  GITHUB_TOKEN:
    description: 'Github token'
    required: true

runs:
  using: 'node12'
  main: 'dist/index.js' # this path starts from action.yml location
```