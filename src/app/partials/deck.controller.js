(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window, DeckService, BackendService) {
    var vm = this;
    vm.deckId = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};

    //init current selected deck
    vm.initDeck = function(value){
      if(value=='new'){
        vm.creationMode=true;
      }else {
        vm.creationMode=false;
        var deck = new BackendService.Deck();
        //deck.id = value;
        //deck.name =
        console.log(deck)



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
      BackendService.createNewDeck(name)
        .then(function (result) {
          vm.selectedDeck={id:result.id,name:result.name};
          vm.selectDeck();
        }, function (e) {
          console.log(e);
        });
    };

    //load all deck for decks selector
    vm.getDecks = function () {
      console.log(BackendService.getDecks())
      BackendService.getDecks()
        .then(function (result) {
          console.log(result)
          vm.decks=result
          }, function (e) {
            console.log(e);
          });
    };

    //apply deck choice
    vm.selectDeck = function(){
      $state.go("deck", {id: vm.selectedDeck.id})
    };

    vm.getCards = function () {
      var deck = new BackendService.Deck();
      deck.id=vm.selectedDeck.id;
      deck.getFlashcards()
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

    vm.deleteCard = function(cardId){
      //DeckService.deleteCard(vm.selectedDeck.id, cardId)
      BackendService.removeFlashcard
        .then(function (result) {
          console.log(result);
        }, function (e) {
          console.log(e);
        });
    };

  }

})();
