(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window, BackendService, $log, DeckService) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.innerHeight = {height: $window.innerHeight + 'px'};
    vm.selectedDeck = new BackendService.Deck();
    vm.decks = null;
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectedItemChange = selectedItemChange;
    vm.createDeck = createDeck;
    vm.selectDeck = selectDeck;
    vm.selectCard = selectCard;
    vm.deleteCard = deleteCard;
    vm.clear = clear;
    vm.isOpen = false;

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load) {
        if (vm.decks == null) {
          //create request for deck list
          vm.decks = BackendService.getDecks();
        }
        return vm.decks
          .then(function (result) {
            var list = query ? result.filter(queryFilter(query)) : result;
            // checking if deck name exist for creation
            if (list.length > 0) {
              if (query != list[0].name) {
                vm.read = false;
              } else {
                vm.read = true;
                vm.selectedItem = list[0]
              }
            }
            else {
              vm.creation = vm.selectedDeck.name != query;
            }
            return list
          })
      } else {
        vm.load = true
      }
    }

    function selectedItemChange(value) {
      if (value) {
        vm.read = true
      }
    }

    function createDeck() {
      DeckService.setDeckName(vm.searchText);
      if (vm.deckId.length>0){
        $state.go("deck", {deckId: null});
      } else{
        $state.reload()
      }
    }

    function selectDeck() {
      $state.go("deck", {deckId: vm.selectedItem.id})
    }

    function selectCard(value) {
      $state.go("deck.addCard", {cardId: value})
    }

    function deleteCard(cardId) {
      vm.selectedDeck.removeFlashcard(cardId)
        .then(function (result) {
          selectDeck();
          $log.log(result);
        }, function (e) {
          $log.error(e);
        });
    }

    //LOCAL FUNCTIONS
    function queryFilter(query) {
      //var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        return (deck.name.indexOf(query) === 0);
      };
    }

    function clear() {
      vm.searchText = null;
    }

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards = result;
        }, function (e) {
          $log.error(e);
        });
    }

    //init current selected deck
    function initDeck(value) {
      BackendService.getDeckById(value)
        .then(function (result) {
          //load flashcards for selected deck
          if (vm.deckId.length > 0) {
            vm.read = true;
            vm.selectedDeck = result;
            vm.selectedItem = vm.selectedDeck;
            getCards();
          } else {
            vm.read = false;
            vm.searchText = DeckService.getDeckName();
          }
        }, function (e) {
          $log.error(e);
        });
    }

    initDeck(vm.deckId);
  }


})();
