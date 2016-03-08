(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window, DeckService) {
    var vm = this;
    vm.deckId = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};

    //init current selected deck
    vm.initDeck = function(value){
      if(value<0){
        vm.creationMode=true;
      }else {
        vm.creationMode=false;
        DeckService.getDeck(value)
          .then(function (result) {
            vm.selectedDeck=result.data;
            //init current deck in decks selector (only to show name)
            vm.decks=[vm.selectedDeck];
            //load flashcards for selected deck
            vm.getCards(vm.selectedDeck.id);
          }, function (e) {
            console.log(e);
          });
      }
    };
    vm.initDeck(vm.deckId);

    vm.createDeck = function(name){
      DeckService.createDeck(name)
        .then(function (result) {
          vm.initDeck(result.data.id);
        }, function (e) {
          console.log(e);
        });
    };

    //load all deck for decks selector
    vm.getDecks = function () {
      DeckService.getDecks()
        .then(function (result) {
          vm.decks=result.data
          }, function (e) {
            console.log(e);
          });
    };

    //apply deck choice
    vm.selectDeck = function(){
      $state.go("deck", {id: vm.selectedDeck.id})
    };

    vm.getCards = function (id) {
      DeckService.getCards(id)
        .then(function (result) {
          vm.cards=result.data;
        }, function (e) {
          console.log(e);
        });

    };

    vm.selectCard = function(value){
      vm.cards.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedCard = entry;
        }
      })
    };

  }

})();
