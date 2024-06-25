pipeline {
    agent any

    stages {
        stage('Build') {
            agent{
                docker{
                    image 'node:18-alpine'
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
        stage ('Test'){
            agent{
                docker{
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            
            steps{
                echo 'Test stage'
                sh '''
                test -f build/index.html
                npm test
                '''
            }
        }
        stage ('E2E'){
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
                    reuseNode true
                }
            }
            
            steps{
                echo 'Test stage'
                sh '''
                npm install -g serve
                node_modules/.bin/semver -s build 
                npx playwright test &
                sleep 10
                '''
            }
        }
       
    }
     post{
            always{
                junit 'jest-results/junit.xml'
            }

        }
}
