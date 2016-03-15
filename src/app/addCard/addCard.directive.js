(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('addCard', AddCardDirective);

  /** @ngInject */
  function AddCardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/addCard/addCard.html',
      controller: 'AddCardController',
      controllerAs: 'addCard'
    };
  }

})();
