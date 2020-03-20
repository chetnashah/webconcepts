
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