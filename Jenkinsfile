pipeline {
    agent any

    stages {
        /*
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
        */
        stage('Test') {
            agent { //reusing the node.js image in docker
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Test stage"
                    #test -f "build/index.html"
                    #grep "index.html" build/index.html
                    npm test
               '''
            }
        }
        stage('E2E') {
            agent { //reusing the node.js image in docker 
                docker {
                    image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install -g serve #best run in terminal as local dependency
                    node_modules/.bin/serve -s build #relative path of e2e/node_modules/bin/serve
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