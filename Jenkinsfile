pipeline {
    agent any

    stages {
        stage('Build') {
            agent{
              docker{
                  image 'node:16-alpine'
                  reuseNode true
              }
          }     
            steps {
                sh '''
                   ls -la
                   node --version
                   npm --version
                   NODE_OPTIONS="--no-network-family-autoselection" npm ci
                   npm run build
                   ls -la
                   '''
            }
        }
    }
}
