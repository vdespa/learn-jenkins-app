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
                    echo "Status of index file$?"
                    npm test
                '''
            }
        }

        stage('E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.60.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install -g serve
                    serve -s build
                    npx playwright test
                '''
            }
        }
    }
    post {
        always {
            junit 'test-results/junit.xml'
        }
    }

}