
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