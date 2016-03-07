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
        templateUrl: 'app/partials/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
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
      .state('login', {
        url: '/login',
        template: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
