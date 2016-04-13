(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('topNavbarElements', topNavbarElements);

  /** @ngInject */
  function topNavbarElements() {
    return {
      restrict:'E',
      templateUrl: 'app/navbar/topNavbarElements.html'
    };
  }
})();
