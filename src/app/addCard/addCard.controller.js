(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $document, BackendService, DeckService, $window) {
    var vm = this;

    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;
    vm.deckName=null;
    vm.deckName=DeckService.getDeckName();

    vm.decks = null;
    vm.load = false;

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
      //$window.alert(angular.element($document[0].querySelector("input[name='deckForm']")).css("display", "none"));

      //$window.alert(vm.deckName);

      //Jeżeli pola nie są puste
      if(vm.question!=null && vm.answer!=null)
      {
        if(vm.load)
        {
          if (vm.decks == null) {
            //create request for deck list
            vm.decks = BackendService.getDecks();
          }
          return vm.decks
            .then(function (result) {

              var list = query ? result.filter(queryFilter(query)) : result;
              return list;
              });
        }
        else vm.load = true;

        $window.alert(vm.x);

        if($stateParams.cardId != null)
        {
          //Edycja
          vm.newDeck = BackendService.createNewDeck(vm.deckName);
          vm.newDeck.updateFlashcard($stateParams.cardId, vm.question, vm.answer);
        }
        else
        {
          ////Dodawanie nowej fiszki do znanej talii
          //vm.newDeck = BackendService.createNewDeck(vm.deckName);
          //vm.newDeck.createFlashcard(vm.question, vm.answer);
          //
          ////Dodawanie nowej fiszki do nowej talii
          //vm.newDeck = BackendService.createNewDeck(vm.deckName);
          //vm.newDeck.createFlashcard(vm.question, vm.answer);
          //
          //vm.newDeck = BackendService.getDeckById($stateParams.deckId);
          //vm.newDeck.createFlashcard(vm.question, vm.answer);
        }
      }

      //if nowy name
      //$stateParams.deckId


    };

  }

})();
