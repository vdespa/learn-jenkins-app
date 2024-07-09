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
                   ls | grep package-lock
                   NODE_OPTIONS="--no-network-family-autoselection" npm ci
                   npm run build
                   ls -la
                   '''
            }
        }
    }
}
