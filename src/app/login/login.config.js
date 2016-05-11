(function() {
  'use strict';

  angular
  .module('login')
  .config(config);

  /** @ngInject */
  function config($httpProvider,$provide) {

    //set authentication headers for logged user
    $httpProvider.interceptors.push('LoginInterceptor');

    $provide.decorator('mdInputContainerDirective', function($delegate, $interval) {
      var directive = $delegate[0];

      directive.compile = function() {
        return {
          post: function($scope, element, attr, ctrl) {
            var interval;
            var count = 0;

            if (ctrl.input[0].type === 'password') {
              interval = $interval(function() {
                if (count > 10) {
                  $interval.cancel(interval);
                }

                if (ctrl.input.parent()[0].querySelector('input:-webkit-autofill')) {
                  ctrl.element.addClass('md-input-has-value');
                  $interval.cancel(interval);
                }

                count++;
              }, 25);
            }
          }
        };
      };

      return $delegate;
    });
  }
})();
