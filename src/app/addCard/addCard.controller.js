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
      //$window.alert(vm.deckName);
      BackendService.getDecks()
        .then(function success(data) {
          vm.decks = data;
          $window.alert(vm.decks);},
        function error(data){
          var message = 'I cant get decks';
          alert(message);
          throw message;
        });

      //Jeżeli pola nie są puste
      if(vm.question!=null && vm.answer!=null)
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

        if($stateParams.cardId != null)
        {
          //Edycja
          BackendService.createNewDeck(vm.deckName)
            .then(function success(data) {
                vm.newDeck = data;

                vm.newDeck.updateFlashcard($stateParams.cardId, vm.question, vm.answer)
                .then(function success(data) {
                    $window.aler("Zaktualizowano fiszkę")
                  },
                  function error(data){
                    var message = 'I cant update a flash card';
                    alert(message);
                    throw message;
                  });
            },
            function error(data){
              var message = 'I cant create new deck';
              alert(message);
              throw message;
            });
        }
        else
        {
          //Dodawanie nowej fiszki do znanej talii
          vm.newDeck = BackendService.createNewDeck(vm.deckName);
          vm.newDeck.createFlashcard(vm.question, vm.answer);

          //Dodawanie nowej fiszki do nowej talii
          vm.newDeck = BackendService.createNewDeck(vm.deckName);
          vm.newDeck.createFlashcard(vm.question, vm.answer);

          vm.newDeck = BackendService.getDeckById($stateParams.deckId);
          vm.newDeck.createFlashcard(vm.question, vm.answer);
        }
      }

    }
  }

})();
