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
                    stash name: 'allure-results', includes: 'reports/*'
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' // Extraire les résultats
            script {
                // Vérifie que les fichiers sont bien là
                sh 'ls -al reports'
                if (fileExists('reports/cucumber-report.json')) {
                    echo "Fichier cucumber-report.json trouvé."
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'reports/cucumber-report.json']]
                    ])
                } else {
                    echo "Fichier cucumber-report.json non trouvé dans reports."
                }
            }
        }
    }
}
