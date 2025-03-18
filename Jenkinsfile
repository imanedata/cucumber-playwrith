pipeline {
    agent any
    tools {
        allure 'allure'  // Assurez-vous que ce nom correspond à celui configuré dans Jenkins
    }
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
                    // Stash des résultats allure
                    stash name: 'allure-results', includes: 'reports/cucumber-report.json'
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' // Extraire les résultats
            script {
                echo "Liste des fichiers dans allure-results :"
                sh 'ls -al reports'  // Vérifie les fichiers dans reports
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
