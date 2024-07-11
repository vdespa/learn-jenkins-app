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
                   npm ci --legacy-peer-deps
                   npm run build
                   ls -la
                   '''
            }
        }
    }
}
