(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('addCard', AddCardDirective)
    .directive('deckList', DeckListDirective);


  /** @ngInject */
  function DeckListDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/decks/decklist.html',
      controller: 'DeckListController',
      controllerAs: 'deckList'
    }
  }
  function AddCardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/addCard/addCard.html',
      controller: 'AddCardController',
      controllerAs: 'AddCardController'
    }
  }
})();
