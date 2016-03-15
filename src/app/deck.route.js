(function() {
  'use strict';

  angular
    .module('studyBoxFeDeck')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('deck', {
        parent: 'navbar',
        url: '/deck/:deckId',
        templateUrl: 'app/decks/deck.page.html'
      })
      .state('deck.addCard', {
        parent: 'deck',
        url: '/:cardId'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
