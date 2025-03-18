pipeline {
    agent any
    stages {
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                }
            }

            steps {
                script {
                    sh 'mkdir -p reports'
                    sh 'npm ci'
                    sh 'npx cucumber-js --tags post --format json:reports/cucumber-report.json'
                    //sh 'allure generate ./allure-results -o ./allure-report'
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' // Extraire les résultats
        script {
            // Assurez-vous que le chemin allure-results est correct
            echo "Liste des contenus de allure-results :"
            sh 'ls -al allure-results'
            
            // Générer le rapport Allure
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']] // Assurez-vous que ce chemin est correct
            ])
        }
    }
}
