
## How project graph is built?

1. Analyze `dependencies` in `package.json`.
2. import statements referencing a particular project's path alias.
3. Manually created `implicitDependencies` field in the project configuration file (`project.json`), or `nx` config object inside `package.json`.

### Project(i.e. package) level configuration

1. (Default priority) Tasks inferred by Nx plugins from tooling configuration
2. (Higher priority) Workspace targetDefaults defined in the `nx.json` file
3. (Higest priority) Individual project level configuration files (package.json and project.json)


## What are tasks?

A task in Nx refers to a specific action or command that can be executed within a project. 
It can be 
1. created from existing `package.json` **scripts**, 
2. inferred from tooling configuration files, or 
3. defined in a `project.json` file.

### How to run a task?

```
nx run <project>:<task>
```
Where `<project>` is the name of the project and `<task>` is the name of the task.
e.g. `nx run app:build`.



