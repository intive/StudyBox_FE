(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('newDeckFab', newDeckFab);

  /** @ngInject */
  function newDeckFab() {
    return {
      restrict:'E',
      templateUrl: 'app/navbar/newDeckFab.html'
    };
  }
})();
