(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $document, BackendService, $window) {
    var vm = this;

    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;

    vm.toggleStatus = false;

    vm.toggleButton = function ()
    {
      if(vm.toggleStatus === false)
        angular.element($document[0].querySelector('#hint')).css("display", "block");
      else
        angular.element($document[0].querySelector('#hint')).css("display", "none");

      vm.toggleStatus = !vm.toggleStatus;
    };

    vm.submitCard = function ()
    {
      $window.alert(angular.element($document[0].querySelector("input[name='deckForm']")).css("display", "none"));

      //Jeżeli pola nie są puste
      if(vm.question!=null && vm.answer!=null)
      {
        if($stateParams.cardId == null)
        {
          //Dodawanie
          BackendService.createFlashcard(vm.question, vm.answer);
        }
        else
        {
          //Edycja
          BackendService.updateFlashcard($stateParams.cardId, vm.question, vm.answer);
        }
      }

      //if nowy name
      //$stateParams.deckId


    };

  }

})();
