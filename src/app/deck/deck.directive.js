(function() {
  'use strict';

  angular
    .module('deck')
    .directive('deck', DeckDirective);

  /** @ngInject */
  function DeckDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/deck/deck.html',
      controller: 'DeckController',
      controllerAs: 'deck'
    };
  }

})();
