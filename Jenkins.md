
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