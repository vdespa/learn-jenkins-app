pipeline {
    agent any

    stages {
        stage('Build') {
            agent{
                docker{
                    image 'node:19.8.1-alpine3.17'
                    reuseNode true
                }
            }
            steps {
                sh '''
                   ls -la
                   node --version
                   npm --version
                   npm ci --legacy-deps
                   npm run build
                   ls -la
               ''' 
            }
        }
    }
}

