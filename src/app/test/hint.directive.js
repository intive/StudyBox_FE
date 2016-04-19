(function() {
  'use strict';

  angular
    .module('test')
    .directive('hint', HintDirective);

  /** @ngInject */
  function HintDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/test/hint.html',
      controller: 'TestController',
      controllerAs: 'test',
      scope:{
        content: "@"
      }
    };
  }

})();
