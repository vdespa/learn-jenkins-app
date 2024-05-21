pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    #ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                    echo "Test stage"
                    echo "-f build/index.html"
                    test -f "build/index.html"
                    #grep "index.html" build/index.html
                    npm test
               '''
            }
        }
    }
}