(function() {
  'use strict';

  angular
    .module('deck')
    .directive('deckEdit', DeckDirective);

  /** @ngInject */
  function DeckDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/deck/deck-edit.page.html',
      controller: 'DeckEditController',
      controllerAs: 'deckEdit'
    };
  }

})();
