(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('deck', DeckDirective);

  /** @ngInject */
  function DeckDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/decks/deck.html',
      controller: 'DeckController',
      controllerAs: 'deck'
    };
  }

})();
