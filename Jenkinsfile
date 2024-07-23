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
                sh'''
                    ls -la
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
               agent {
                    docker {
                        image 'node:18-alpine'
                        reuseNode true
                     }
                }
            
            steps {
                sh '''
                    #test -f build/index.html
                     npm test
                '''
            }
        }

        stage('E2E') {
               agent {
                    docker {
                        image 'mcr.microsoft.com/playwright:v1.45.1-jammy'
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
