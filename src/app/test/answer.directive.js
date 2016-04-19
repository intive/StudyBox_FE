(function() {
  'use strict';

  angular
    .module('test')
    .directive('answer', AnswerDirective);

  /** @ngInject */
  function AnswerDirective() {
    return {
      restrict: 'E',
      template: '{{content}}',
      scope:{
        content: "@"
      }
    };
  }

})();
