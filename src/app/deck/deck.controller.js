(function() {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window, BackendService, $log, DeckService) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};
    vm.selectedDeck = new BackendService.Deck();
    vm.decks = null;
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectedItemChange = selectedItemChange;
    vm.selectDeck = selectDeck;
    vm.selectCard = selectCard;
    vm.deleteCard = deleteCard;
    vm.clear = clear;
    vm.creation = false;

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load){
        if (vm.decks == null){
          //create request for deck list
          vm.decks = BackendService.getDecks();
        }
        return vm.decks
          .then(function(result){
            var list = query ? result.filter( queryFilter(query) ) : result;
            // checking if deck name exist for creation
            if (list.length > 0) {
              if (query != list[0].name){
                vm.creation = true;
              }else{
                vm.creation = false;
                vm.selectedItem = list[0]
              }
            }
            else {
              vm.creation = vm.selectedDeck.name != query;
            }
            DeckService.setCreation(vm.creation);
            if(vm.creation){
              DeckService.setDeckName(vm.searchText);
            }
            vm.name = DeckService.getDeckName();
            vm.cre = DeckService.getCreation();
            return list
          })
        }else {
        vm.load = true
      }
    }

    function selectedItemChange(value){
      if(value){vm.creation=false}
    }
    //apply deck choice
    function selectDeck(){
      $state.go("deck", {deckId: vm.selectedItem.id})
    }

    function selectCard(value){
      $state.go("deck.addCard", {cardId: value})
    }

    function deleteCard(cardId){
      vm.selectedDeck.removeFlashcard(cardId)
        .then(function (result) {
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

    function clear(){
      vm.searchText=null;
    }

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards=result;
        }, function (e) {
          $log.error(e);
        });
    }

    //init current selected deck
    function initDeck(value){
      BackendService.getDeckById(value)
        .then(function (result) {
          vm.selectedDeck=result;
          vm.selectedItem=vm.selectedDeck;
          //load flashcards for selected deck
          getCards();
          DeckService.setCreation(vm.creation);
          vm.name = DeckService.getDeckName();
          vm.cre = DeckService.getCreation();
        }, function (e) {
          $log.error(e);
        });
    }
    initDeck(vm.deckId);
  }


})();
