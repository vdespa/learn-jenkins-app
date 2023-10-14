pipeline {
    agent any

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
}