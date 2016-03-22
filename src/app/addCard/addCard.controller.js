(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $document, BackendService) {
    var vm = this;

    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;

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
        angular.element($document[0].querySelector('#hint')).css("display", "block");
      else
        angular.element($document[0].querySelector('#hint')).css("display", "none");

      vm.toggleStatus = !vm.toggleStatus;
    };


    vm.submitForm = function()
    {

    };

  }

})();
