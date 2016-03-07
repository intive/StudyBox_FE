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
            template: 'Study Box Front-end'
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
      });

    $urlRouterProvider.otherwise('/decks');
  }

})();
