pipeline {
    agent any

    stages {
        stage('w/o docker') {
            steps {
                sh 'echo "Without docker"'
            }
        }
        
        stage('w/ docker') {
            agent{
                docker{
                    image 'node:19.8.1-alpine3.17'
                }
            }
            steps {
                sh 'echo "Without docker"'   
                sh 'npm --version'
        
            }
        }
    }
}

