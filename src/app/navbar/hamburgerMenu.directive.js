(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('hamburgerMenu', hamburgerMenu);

  /** @ngInject */
  function hamburgerMenu() {
    return {
      restrict:'E',
      templateUrl: 'app/navbar/hamburgerMenu.html'
    };
  }
})();
