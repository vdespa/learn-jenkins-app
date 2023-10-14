pipeline {
    agent any

    stages {
        stage('build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    //args '--entrypoint=""'
                    //reuseNode true
                }
            }
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('unit tests') {
            agent {
                docker {
                    image 'node:18-alpine'
                    //args '--entrypoint=""'
                    //reuseNode true
                }
            }
            steps {
                sh 'ls -la'
                sh 'npm install'
                sh 'npm test'
                
            }
        }        
    }
}