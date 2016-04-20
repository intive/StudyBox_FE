(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckPreviewController', DeckPreviewController);

  /** @ngInject */
  function DeckPreviewController($stateParams, $state, BackendService, $log, DeckService) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.selectedDeck = new BackendService.Deck();
    vm.selectCard = selectCard;
    vm.clear = clear;
    vm.getDecks = getDecks;
    vm.selectDeck = selectDeck;

    vm.hints = ['podpowiedź 1', 'podpowiedź 2', 'podpowiedź 3'];
    vm.toggledHints = null;
    vm.toggleHints = toggleHints;

    vm.access = $stateParams.access;

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load) {
        if (!vm.decks) {
          //create request for deck list
          vm.decks = BackendService.getDecks(vm.access);
        }
        return vm.decks
          .then(function (result) {
            var list = query ? result.filter(queryFilter(query)) : result;
            if (query){
              list.unshift({name:query});
            }
            return list;
          });
      } else {
        vm.load = true;
      }
    }

    function selectDeck(deck) {
      if (!deck) return;
      if (deck.id && deck.id != $stateParams.deckId) {
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        $state.go($state.current, {deckId: deck.id}, {notify: false});
        initDeck(deck.id);
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      //for selecting on ui (ng-repeat)
      if(card.id !=vm.selectedCardId) {
        pickUpCard(card.id);
        $state.go($state.current, {cardId: card.id}, {notify:true});
      } else {
        pickUpCard(false);
        $state.go($state.current, {cardId: null}, {notify:true});
      }
    }

    function pickUpCard(cardId) {
      vm.selectedCardId = cardId;
    }

    //LOCAL FUNCTIONS
    function clear() {
      vm.searchText = null;
    }

    function queryFilter(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        if(deck.name){
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        }
      };
    }

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards = result;
        }, function (e) {
          $log.error(e);
        });
    }

    //init current deck
    function initDeck(value) {
      if(value){
        BackendService.getDeckById(value)
          .then(function (result) {
            vm.selectedDeck = result;
            vm.selectedItem = vm.selectedDeck;
            if (result.isPublic){
              vm.deckAccess = 'public';
            } else {
              vm.deckAccess = 'private';
            }
            vm.searchText = vm.selectDeck.name;
            DeckService.setNewDeck({name: vm.selectedDeck.name, access: vm.deckAccess});
            getCards();
            vm.dataChanged = false;
          }, function (e) {
            $log.error(e);
          });
      } else {
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
        vm.dataChanged = false;
      }
      pickUpCard($stateParams.cardId);
    }
    initDeck($stateParams.deckId);

    function toggleHints(id) {
      if(vm.toggledHints == id)
        vm.toggledHints = null;
      else
        vm.toggledHints = id;
    }

  }
})();
