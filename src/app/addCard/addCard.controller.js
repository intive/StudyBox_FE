(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($document) {
    var vm = this;

    vm.getDecks = function () {
      //service will be used in future

      return[
        {id: 0, name: 'deck_0'},
        {id: 12, name: 'deck_1'},
        {id: 23, name: 'deck_2'},
        {id: 34, name: 'deck_3'}];
    };

    vm.categories = vm.getDecks();

    vm.toggleStatus = false;

    vm.toggleButton = function ()
    {
      if(vm.toggleStatus === false)
      {
        angular.element($document[0].querySelector('#hint')).css("display", "block");
        angular.element($document[0].querySelector('#addButtonTooltip')).innerHTML = "Usuń podpowiedź";
      }
      else
      {
        angular.element($document[0].querySelector('#hint')).css("display", "none");
        angular.element($document[0].querySelector('#addButtonTooltip')).innerHTML = "Dodaj podpowiedź";
      }

      vm.toggleStatus = !vm.toggleStatus;
    };

  }

})();
