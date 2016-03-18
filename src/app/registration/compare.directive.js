(function() {
  'use strict';

angular
.module('registration')
.directive('compareTo', compareTo);

/** @ngInject */
function compareTo() {
  return {
    require: "ngModel",
    scope: {
        otherModelValue: "=compareTo"
  },
  link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
}
})();
