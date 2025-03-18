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
                    // Génération des résultats allure ici (si nécessaire)
                    // sh 'allure generate ./allure-results -o ./allure-report'
                    
                    // Stash les résultats allure pour le post
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' // Extraire les résultats
            script {
                // Vérification du contenu du répertoire allure-results
                echo "Liste des contenus de allure-results :"
                sh 'ls -al allure-results'
                
                // Vérifiez si des fichiers existent dans ce répertoire
                def allureResultsExist = sh(script: 'ls allure-results | wc -l', returnStdout: true).trim()
                if (allureResultsExist == '0') {
                    echo "Aucun fichier dans le répertoire allure-results !"
                } else {
                    echo "Des fichiers ont été trouvés dans allure-results."
                    
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
    }
}
