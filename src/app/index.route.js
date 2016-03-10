(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/login/landing.html',
        controller: 'LandingController',
        controllerAs: 'landing'
      })
      .state('navbar', {
        templateUrl: 'app/navbar/navbar.html',
        controller: 'NavbarController',
        controllerAs: 'navbar'
      })
      .state('addCard', {
        parent: 'navbar',
        url: '/addCard',
        controller: 'AddCardController',
        controllerAs: 'AddCardController',
        templateUrl: 'app/addCard/addCard.html'
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
        url: '/deck/:id',
        templateUrl: 'app/decks/deck.html',
        controller: 'DeckController',
        controllerAs: 'deck'
      })
      .state('registration', {
        url: '/registration',
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'registration'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
