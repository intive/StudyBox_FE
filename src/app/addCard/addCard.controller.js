(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $state, $document, BackendService, DeckService, $log) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;
    vm.submitCard = submitCard;
    vm.toggleButton = toggleButton;
    vm.decks = null;
    vm.load = false;
    vm.toggleStatus = false;

    if (vm.cardId){
      vm.card = DeckService.getCardObj();
      if (vm.card){
        vm.question = vm.card.question;
        vm.answer = vm.card.answer;
        vm.editMode=true
      }
    }

    function toggleButton() {
      if(vm.toggleStatus === false)
        angular.element($document[0].querySelector('#hint')).css("display", "block");
      else
        angular.element($document[0].querySelector('#hint')).css("display", "none");

      vm.toggleStatus = !vm.toggleStatus;
    }

    function submitCard(isValid) {
      //alert('deckName: '+vm.deckName+'\n'+'deckId: ('+$stateParams.deckId+')\n'+'cardId: '+$stateParams.cardId+'\n'+'vm.question: '+vm.question+'\n'+'vm.answer: '+vm.answer);
      //gdy formularz nie przechodzi walidacji
      if(!isValid){return}
      vm.deck = DeckService.getDeckObj();
      vm.newName = DeckService.getNewDeckName();
      //$log.log('deck');
      //$log.log(vm.deck);
      //$log.log(vm.newName);

      //sprawdzenie nazwy talii
      if (!vm.newName) {
        //todo
        // zapis pytania i odp
        $log.warn("pusta nazwa talii");
        DeckService.setEmptyNameError(true);
        return $state.reload()
      }
      //sprawdzenie zmiany nazwy talii
      if (vm.deck && vm.newName != vm.deck.name) {
        $log.warn("zmieniono nazwe talii");
        var nameChange = true;
      }
      //Jeżeli pola nie są puste
      var cardInDeck;
      if(angular.isDefined(vm.question) && angular.isDefined(vm.answer)) {
        if($stateParams.cardId) {
          cardInDeck = editFlashCard()
        } else {
          if($stateParams.deckId) {
            cardInDeck = createFlashCard()
          } else {
            cardInDeck = createDeckWithFlashCard()
          }
        }
      }
      //update deck name
      if (nameChange) {
        cardInDeck
          .then(function success() {
            return vm.newDeck.changeName(vm.newName)
          },
          function error() {
            var message = 'I cant create/update card';
            alert(message);
            throw message;
          })
          .then(function success() {
            $state.go("deck.addCard", {deckId: vm.newDeck.id});
            $state.reload("deck");
          },
          function error() {
            var message = 'I cant update Deck name';
            alert(message);
            throw message;
          })
      }

    }

    function editFlashCard(){
      return BackendService.getDeckById($stateParams.deckId)
        .then(function success(data) {
          vm.newDeck = data;
          return vm.newDeck.updateFlashcard($stateParams.cardId, vm.question, vm.answer)
        },
        function error(){
          var message = 'I cant create new deck';
          alert(message);
          throw message;
        })
        .then(function success() {
          DeckService.setCardObj(vm.card);
          $state.go("deck", {deckId: vm.newDeck.id});
          $state.reload()
        },
        function error(){
          var message = 'I cant update a flash card';
          alert(message);
          throw message;
        });
    }

    function createFlashCard(){
      return BackendService.getDeckById($stateParams.deckId)
        .then(function success(data) {
          vm.newDeck = data;
          return vm.newDeck.createFlashcard(vm.question, vm.answer)
        },
        function error(){
          var message = 'I cant create new deck';
          alert(message);
          throw message;
        })
        .then(function success() {
          $state.go("deck.addCard", {deckId: vm.newDeck.id});
          $state.reload("deck");
        },
        function error(){
          var message = 'I cant create a flash card';
          alert(message);
          throw message;
        });
    }

    function createDeckWithFlashCard(){
      return BackendService.createNewDeck(vm.newName)
        .then(function success(data) {
          vm.newDeck = data;
          return vm.newDeck.createFlashcard(vm.question, vm.answer)
        },
        function error(){
          var message = 'I cant create new deck';
          alert(message);
          throw message;
        })
        .then(function success() {
          $state.go("deck.addCard", {deckId: vm.newDeck.id});
        },
        function error(){
          var message = 'I cant create a flash card';
          alert(message);
          throw message;
        });
    }

  }

})();
