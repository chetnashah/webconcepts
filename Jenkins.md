
### Where is it executed?

top level is executed on master/controller.
Stages might be executed on agents.

### Where is the code/artifacts for the build job?

At the start of the build job you will see something like...
```sh
# the workspace path contains jobname in the end
Building in workspace /var/lib/jenkins/workspace/node-jenkins-demo
```

### Env vars when running

```
HOME	/var/lib/jenkins
JENKINS_HOME	/var/lib/jenkins
USER	jenkins
PWD	/var/lib/jenkins
PATH	/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

```

### Linting jenkins file

check vscode extension jenkins linter connector

### Writing test cases for your jenkins pipeline

https://github.com/jenkinsci/JenkinsPipelineUnit

### Best practices

https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/


## Why use docker containers as build agents?

So that we are not constrained by laptop/desktop tooling, and can create env from scratch needed for build.
i.e. we do not need static/global versions of tools installed in the machine.

https://www.youtube.com/watch?v=ymI02j-hqpU

We can also have a per-stage level docker container to run the stage in:
We use maven container for backend build, we use node-alpine container for frontend build.
```
pipeline {
  agent none
  stages {
    stage('Back-end') {
      agent {
        docker { image 'maven:3.8.1-adoptopenjdk-11' }
      }
      steps {
        sh 'mvn --version'
      }
    }
    stage('Front-end') {
      agent {
        docker { image 'node:16-alpine' }
      }
      steps {
        sh 'node --version'
      }
    }
  }
}
```

### Build docker-image on the fly which should be used as a base environment for stage

https://github.com/darinpope/jenkins-example-docker/blob/main/Jenkinsfile-3

## How to use docker for state/steps?

Build and use Docker containers from pipelines
Install -> Docker plugin and Docker Pipeline.

### Use timeouts at stage level

### Jenkins ports

slave agent - 50000
web ui interface - 8080

### Jenkins job DSL

Enables infrastructure/pipeline as code. Only functionality is to create new jobs programatically.
Allows jobs and views to be configured via DSL.
Needs JOb DSL Plugin. starts as freestylproject.
IN Build UI step select => Process Job DSL.

You need to approve script in Manage Jenkins > In process script approval

example
```groovy
// This dsl script when executed generates 
// a brand new Job named "job-name-generated" with UI according
// to the script blocks mentioned below
job('job-name-generated') {
    scm { // Source Code management 
        git('git://github.com/chetnashah/list-of-cheeses.git') { node ->
            node / gitConfigName('chetnashah')
            node / gitConfigEmail('chetshah80@gmail.com')
        }
    }

    wrappers {
        nodejs('nodejs') // this is Manage Jenkins -> configure tools -> nodejs installations -> name
    }

    steps {
        shell("npm install")
    }
}
```

Each docker plugin can introduce its own groovy syntax/block for configuration,
equivalent to plugin specific inputs in UI. (https://jenkinsci.github.io/job-dsl-plugin/)

### Jenkins pipelines

Essentially Jenkins build steps in code.

Build steps allow you to
1. build/compile
2. test
3. deploy
within code.

#### Jenkins pipelines vs Jenkins Job DSL

Job DSL creates new jobs based on code you write.
wheas



### Global software installation for jenkins

Global software installation for jenkins e.g. docker/node/jdk etc.
can be done by going to "Global tool configuration"

### Node app build job without docker

1. Manage Plugins -> Install NodeJS plugin.
2. Global tool configuration -> nodejs -> install nodejs version
3. New job -> Free style project -> Build environment -> provide node in path installed in above step.

### Running sudo commands in jenkins shell

By default the shell script provided in jenkins UI runs as `jenkins` user.
Also as a result by default tools which call `docker` commands will fail directly due to 
permission issues.


### global tool installation

 * Formalization of a tool installed in nodes used for builds.
 * (Examples include things like JDKs, Ants, Mavens, and Groovys.)


### Building docker images in jenkins environment/job

Multiple ways:
1. jenkins plugin "docker" - e.g. "Cloudbees docker build and publish plugin".

### 

Force stopping a zombie build:
Go to Manage Jenkins > Script console, Enter code below
```
 Jenkins .instance.getItemByFullName("JobName")
        .getBuildByNumber(JobNumber)
        .finish(hudson.model.Result.ABORTED, new java.io.IOException("Aborting build")); 

```

Example nodejs pipeline that contains all parts in pipeline script:
```
pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Checkout external proj') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-chetnashah-https',
                    url: 'https://github.com/chetnashah/formik-app.git'

                echo 'checked out commit: $GIT_COMMIT'
                sh "ls -lat"
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dist/**', onlyIfSuccessful: true
        }
    }
}
```



### running jenkins within a docker container (instead of a vm/vagrant)

https://github.com/jenkinsci/docker/blob/master/README.md
```sh
docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```

### Docker path setup for mac users

Note you should update homebrew file `(HOMEBREW_PREFIX/Cellar/jenkins-lts...jenkins-lts.plist)` file which overrides the `~/Library/LaunchAgents/...jenkins-lts.plist` file.

```
The /usr/local/bin directory is not included in the macOS PATH for Docker images by default. If executables from /usr/local/bin need to be called from within Jenkins, then the PATH needs to be extended to include /usr/local/bin. Add a path node in the file "/usr/local/Cellar/jenkins-lts/XXX/homebrew.mxcl.jenkins-lts.plist" like this:

Contents of homebrew.mxcl.jenkins-lts.plist
<key>EnvironmentVariables</key>
<dict>
<key>PATH</key
<string><!-- insert revised path here --></string>
</dict>
The revised PATH string should be a colon separated list of directories in the same format as the PATH environment variable and should include:

/usr/local/bin

/usr/bin

/bin

/usr/sbin

/sbin

/Applications/Docker.app/Contents/Resources/bin/

/Users/XXX/Library/Group\ Containers/group.com.docker/Applications/Docker.app/Contents/Resources/bin (where XXX is replaced by your user name)

Now restart jenkins using "brew services restart jenkins-lts"
```