(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('elastic', ElasticDirective)
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $state, $window) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};

    vm.getDecks = function () {
      //service will be used in future

      return[
        {id: 0, name: 'deck_0'},
        {id: 12, name: 'deck_1'},
        {id: 23, name: 'deck_2'},
        {id: 34, name: 'deck_3'}]
    };

    vm.categories = vm.getDecks();

  }

  function ElasticDirective() {
    return {
      restrict: 'A',
      link: function($scope, element) {
        $scope.initialHeight = $scope.initialHeight || element[0].style.height;
        var resize = function() {
          element[0].style.height = $scope.initialHeight;
          element[0].style.height = "" + element[0].scrollHeight + "px";
        };
        element.on("input change", resize);
        $timeout(resize, 0);
      }
    };
  }

})();
