pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '75873f4e-5c19-40c8-96c9-7ed0b220ecb4'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')    
    }
    
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    
                    reuseNode true
                    args '-u root:root'
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

        stage('Tests') {
            parallel {
                stage('Unit tests') {
                    agent {
                    docker {
                        image 'node:18-alpine'
                        reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            #test -f build/index.html
                            #echo "Status of index file $?"
                            npm test
                        '''
                    }
                    post {
                        always {
                            junit 'jest-results/junit.xml'
                        }
                    }
                }
               
                stage('E2E') {
                    agent {
                        docker {
                            image 'mcr.microsoft.com/playwright:v1.60.0-jammy'
                            reuseNode true
                            args '-u root:root'
                        }
                    }
                    steps {
                        sh '''
                            npm install serve
                            node_modules/.bin/serve -s build &
                            sleep 10
                            npx playwright test --reporter=html
                        '''
                    }

                    post {
                        always {
                            junit 'jest-results/junit.xml'
                            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright local', reportTitles: '', useWrapperFileDirectly: true])
                        }
                    }
                } 
                
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.60.0-jammy'
                    reuseNode true
                    args '-u root:root'
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"

                    node_modules/.bin/netlify status

                    node_modules/.bin/netlify deploy --dir=build --prod

                '''
            }
        }

                       
        stage('Prod E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.60.0-jammy'
                    reuseNode true
                    args '-u root:root'
                }      
            }

            environment {
                CI_ENVIRONMENT_URL = 'https://storied-fudge-920216.netlify.app'
            }

            steps {
                sh '''
                    npx playwright test --reporter=html
                '''
            }
            post {
               always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright E2E Report', reportTitles: '', useWrapperFileDirectly: true])
                }
             
            }
        }
    }
}