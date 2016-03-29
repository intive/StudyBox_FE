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
    vm.load = false;
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
      DeckService.setDeckName(deck.name);
      console.log('create')
      if (vm.deckId){
        console.log('sure')
        $state.go("deck", {deckId: null}, {notify: false});
        vm.deckId = vm.selectedDeck.id;
        initDeck(vm.deckId);
        $state.go("deck.addCard", {cardId: null})
      }
    }

    function selectDeck(deck) {
      if (deck.id != vm.deckId){
        $state.go("deck", {deckId: deck.id}, {notify: false});
        vm.deckId = vm.selectedDeck.id;
        initDeck(vm.deckId);
        $state.go("deck.addCard", {cardId: null})
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      vm.selectedCardId = card.id;
      $state.go("deck.addCard", {cardId: card.id})
    }

    function removeCard(cardId){
      if (vm.cards.length > 1){
        deleteCard(cardId)
      } else {
        $log.warn('last one flashcard')
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
          if (vm.deckId.trim()) {
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
