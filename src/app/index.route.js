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
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('addCard', {
        url: '/addCard',
        controller: 'AddCardController',
        controllerAs: 'AddCardController',
        templateUrl: 'app/addCard/addCard.html'
      })
      .state('decks', {
        parent: 'home',
        url: 'decks',
        templateUrl: 'app/partials/decks.html',
        controller: 'DecksController',
        controllerAs: 'decks'
      })
      .state('deck', {
        parent: 'home',
        url: 'deck/:id',
        templateUrl: 'app/partials/deck.html',
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
      })
      .state('landing', {
        url: '/landing',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'landing'
      });

    $urlRouterProvider.otherwise('/decks');
  }

})();
