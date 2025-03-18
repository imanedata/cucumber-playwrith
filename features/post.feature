Feature: Post

  Background:
    Given I open the login page
    When I login with username "testeur_integration" and password "testeur_qa"
    Then I should be redirected to the dashboard

  @post
  Scenario: Create post button
    Given Je suis sur le dashboard
    And je clique sur le bouton add post
    Then je suis redirige vers la page de creation de post
    And je creer un post avec "super titre" et "super content" et je clique sur le bouton save
    Then je vois mon super post dans la liste des posts
