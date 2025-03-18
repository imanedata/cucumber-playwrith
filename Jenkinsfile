pipeline {
    agent any
    tools {
        // Spécifier le nom de l'outil Allure configuré dans Jenkins
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
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' // Extraire les résultats
            script {
                echo "Liste des fichiers dans allure-results :"
                sh 'ls -al allure-results'  // Listez les fichiers dans allure-results pour vérifier
                if (fileExists('allure-results') && fileExists('allure-results/*.json')) {
                    echo "Dossier allure-results et fichiers JSON trouvés."
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                } else {
                    echo "Aucun fichier JSON trouvé dans allure-results."
                }
            }
        }
    }
}
