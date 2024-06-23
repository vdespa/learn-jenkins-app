pipeline {
    agent any

    stages {
        stage('npm in docker') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                 sh '''
                 ls -la
                 echo "Docker container started"
                 npm --version
                '''
            }
        }
     
    }
}
