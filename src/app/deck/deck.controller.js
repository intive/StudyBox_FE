(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, BackendService, $log, DeckService) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.selectedDeck = new BackendService.Deck();
    vm.decks = null;
    vm.load = true;
    vm.getDecks = getDecks;
    vm.selectedDeckChange = selectedDeckChange;
    vm.createDeck = createDeck;
    vm.selectDeck = selectDeck;
    vm.selectCard = selectCard;
    vm.removeCard = removeCard;
    vm.clear = clear;

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load) {
        if (!vm.decks) {
          //create request for deck list
          vm.decks = BackendService.getDecks();
        }
        return vm.decks
          .then(function (result) {
            var list = query ? result.filter(queryFilter(query)) : result;
            if (query){
              list.push({name:query});
            }
            return list
          })
      } else {
        vm.load = true
      }
    }

    function selectedDeckChange(deck) {
      if (deck) {
        if (deck.id){
          selectDeck(deck);
        } else {
          createDeck(deck);
        }
      }
    }

    function createDeck(deck) {
      $log.info('create');
      DeckService.setDeckName(deck.name);
      if (vm.deckId.length>0){
        $log.log('go');
        $state.go("deck", {deckId: null});
        clear();
      } else{
        $log.log('relo');
        $state.reload();
      }
    }

    function selectDeck(deck) {
      $log.info('select');
      if (deck.id != vm.deckId){
        $log.log('inne');
        $state.go("deck", {deckId: vm.selectedDeck.id});
        clear();
      } else {
        $log.warn('to samo');
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      $state.go("deck.addCard", {cardId: card.id})
    }

    function removeCard(cardId){
      if (vm.cards.length > 1){
        deleteCard(cardId)
      } else {
        $log.warn('last one')
      }
    }

    function deleteCard(cardId) {
      vm.selectedDeck.removeFlashcard(cardId)
        .then(function (result) {
          $state.go("deck", {deckId: vm.selectedDeck.id});
          getCards();
          $log.log(result);
        }, function (e) {
          $log.error(e);
        });
    }

    //LOCAL FUNCTIONS
    function queryFilter(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        if(deck.name){
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        }
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
            vm.selectedDeck = result;
            vm.inputDeck = vm.selectedDeck;
            getCards();
          } else {
            vm.searchText = DeckService.getDeckName();
          }
        }, function (e) {
          $log.error(e);
        });
    }
    initDeck(vm.deckId);
  }


})();
