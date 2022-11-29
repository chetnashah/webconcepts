
## Glossary

### Pipeline

A Bitrise Pipeline is the top level of the Bitrise CI/CD configuration. Pipelines can be used to organize the entire CI/CD process and to set up advanced configurations with multiple different tasks running parallel and/or sequentially.


### Stage

**A Stage is a collection of Workflows.** Stages are the top-level building blocks of Pipelines. 

**A Stage can contain multiple Workflows, which all run in parallel in the same Stage.**

If all Workflows are successful in a Stage, the Pipeline moves on to the next Stage. 

If any of the Workflows fail, the Pipeline ends without running the other Stages unless you configure a given Stage to always run.


### step

A Step is a block of script execution that encapsulates a build task on Bitrise: the code to perform that task, the inputs and parameters you can define for the task, and the outputs the task generates.

### Workflow 

Workflow
**A Workflow is a collection of Steps, Environment Variables, and other configurations.**

When Bitrise starts a build, it runs one or more Workflows according to the configuration defined in the bitrise.yml file.


### Utility Workflow

Utility Workflows
Bitrise supports a special type of Workflow called a utility Workflow. A utility Workflow's ID always starts with an underscore character: for example, _setup. They are usually used to perform tasks that are required either at the start or at the end of several different Workflows: for example, you can separate git cloning and activating your SSH key into a utility Workflow instead of adding those Steps to every Workflow of an app.

