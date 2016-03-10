(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DeckListController', DecklistController);

  /** @ngInject */
  function DecklistController($stateParams, $state, $window, BackendService, $log) {
    var vm = this;
    vm.deckId = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};
    vm.selectedDeck = new BackendService.Deck();

    //init current selected deck
    vm.initDeck = function(value){
      if(value=='new'){
        vm.creationMode=true;
      }else {
        vm.creationMode=false;
        BackendService.getDeckById(value)
          .then(function (result) {
            vm.selectedDeck=result;
            //init current deck in decks selector (only to show name)
            vm.decks=[vm.selectedDeck];
            //load flashcards for selected deck
            vm.getCards();
          }, function (e) {
            $log.error(e);
          });
      }
    };
    vm.initDeck(vm.deckId);

    vm.createDeck = function(name){
      BackendService.createNewDeck(name)
        .then(function (result) {
          vm.selectedDeck=result;
          vm.selectDeck();
        }, function (e) {
          $log.error(e);
        });
    };

    //load all deck for decks selector
    vm.getDecks = function () {
      BackendService.getDecks()
        .then(function (result) {
          $log.log(result)
          vm.decks=result
          }, function (e) {
            $log.error(e);
          });
    };

    //apply deck choice
    vm.selectDeck = function(){
      $state.go("deck", {id: vm.selectedDeck.id})
    };

    vm.getCards = function () {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards=result;
        }, function (e) {
          $log.error(e);
        });
    };

    vm.selectCard = function(value){
      vm.cards.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedCard = entry;
        }
      })
    };

    vm.deleteCard = function(cardId){
      vm.selectedDeck.removeFlashcard(cardId)
        .then(function (result) {
          $log.log(result);
        }, function (e) {
          $log.error(e);
        });
    };

  }

})();
