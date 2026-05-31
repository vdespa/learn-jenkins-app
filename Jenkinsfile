pipeline {
        agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:24.12.0-alpine3.23'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version 
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:24.12.0-alpine3.23'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    echo "Status of build/index.html"
                '''
            }
        }
    }
}