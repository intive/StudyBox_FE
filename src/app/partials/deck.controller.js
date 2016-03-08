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
          }, function (e) {
            console.log(e);
          });
      }
    };
    vm.initDeck(vm.deckId);

    //todo
    //new deck creation
    vm.createDeck = function(){
      console.log('create');
      console.log(vm.newDeck);
      vm.selectedDeck = {id:34, name:vm.newDeck};
      $state.go("deck", { id: vm.selectedDeck.id })
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

    //vm.setCards = function () {
    //  //service will be used in future
    //  vm.cards = [
    //    {id:0, name:vm.selectedDeck.name+'_card_0', question:'question', hint:'hint', answer:'answer'},
    //    {id:11, name:vm.selectedDeck.name+'_card_1', question:'question', hint:'hint', answer:'answer'},
    //    {id:26, name:vm.selectedDeck.name+'_card_2', question:'question', hint:'hint', answer:'answer'},
    //    {id:39, name:vm.selectedDeck.name+'_card_3', question:'question', hint:'hint', answer:'answer'}];
    //
    //};
    //vm.setCards();

    vm.selectCard = function(value){
      vm.cards.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedCard = entry;
        }
      })
    };

  }

})();
