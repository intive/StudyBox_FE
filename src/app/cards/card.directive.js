(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('card', CardDirective);


  /** @ngInject */
  function CardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/cards/card.html',
      controller: 'CardController',
      controllerAs: 'card'
    }
  }
})();
