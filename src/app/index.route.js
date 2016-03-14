(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('navbar', {
        templateUrl: 'app/navbar/navbar.html',
        controller: 'NavbarController',
        controllerAs: 'navbar'
      })
      .state('decks', {
        parent: 'navbar',
        url: '/decks',
        templateUrl: 'app/decks/decks.html',
        controller: 'DecksController',
        controllerAs: 'decks'
      })
      .state('deck', {
        parent: 'navbar',
        url: '/deck/:deckId',
        templateUrl: 'app/decks/deck.page.html'
      })
      .state('deck.addCard', {
        parent: 'deck',
        url: '/:cardId'
      })
      .state('registration', {
        url: '/registration',
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registration'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
