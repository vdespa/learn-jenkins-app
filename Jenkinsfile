pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    triggers {
        // מאפשר לג'נקינס להתעורר משינויים ופתיחת PR-ים ב-GitHub
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                // משיכת הקוד מהענף שהפעיל את הטריגר
                checkout scm
            }
        }

        stage('Lint & Format')
        {
            steps
            {
                sh 'npm ci --legacy-peer-deps'
                echo 'sh npm lint'
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                echo 'Building and testing...'
                // כאן תריץ את הבדיקות שלך, למשל:
                // sh 'npm install && npm test'
            }
        }
    }

    post {
        success {
            // מעדכן את סטטוס הקומיט ב-GitHub כ-Success
            step([$class: 'GitHubCommitStatusSetter',
                  reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/adirmelker1/learn-jenkins-app.git'],
                  contextSource: [$class: 'DefaultCommitContextSource', context: 'test-pipeline'],
                  statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'BetterThanOrEqualBuildResult', result: 'SUCCESS', state: 'SUCCESS', message: 'The build passed!']]]
            ])
        }
        failure {
            // מעדכן את סטטוס הקומיט ב-GitHub כ-Failure
            step([$class: 'GitHubCommitStatusSetter',
                  reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/adirmelker1/learn-jenkins-app.git'],
                  contextSource: [$class: 'DefaultCommitContextSource', context: 'test-pipeline'],
                  statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'BetterThanOrEqualBuildResult', result: 'FAILURE', state: 'FAILURE', message: 'The build failed!']]]
            ])
        }
    }
}