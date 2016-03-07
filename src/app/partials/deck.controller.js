(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window, Decks) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};
    vm.selectedDeck = {id:vm.id, name:null};

    vm.createDeck = function(){
      console.log('create');
      console.log(vm.newDeck);
      vm.selectedDeck = {id:34, name:vm.newDeck};
      $state.go("deck", { id: vm.selectedDeck.id })
    };

    vm.getDecks = function () {
      //service will be used in future
      vm.categories=Decks.getDecks();
    };
    vm.getDecks();
    console.log(vm.categories);

    vm.initDeck = function(value){
      if(value=='new'){
        vm.creationMode=true;
      }else {
        vm.creationMode=false;
        console.log('selectId');
        console.log(value);
        vm.categories.forEach(function(entry) {
          if (entry.id == value){
            vm.selectedDeck = entry;
          }
        })
      }
    };
    vm.initDeck(vm.id);

    vm.selectDeck = function(){
      console.log('selectDeck');
      $state.go("deck", { id: vm.selectedDeck.id })
    };

    vm.setCards = function () {
      //service will be used in future
      vm.cards = [
        {id:0, name:vm.selectedDeck.name+'_card_0', question:'question', hint:'hint', answer:'answer'},
        {id:11, name:vm.selectedDeck.name+'_card_1', question:'question', hint:'hint', answer:'answer'},
        {id:26, name:vm.selectedDeck.name+'_card_2', question:'question', hint:'hint', answer:'answer'},
        {id:39, name:vm.selectedDeck.name+'_card_3', question:'question', hint:'hint', answer:'answer'}];

    };
    vm.setCards();

    vm.selectCard = function(value){
      vm.cards.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedCard = entry;
        }
      })
    };

  }

})();
