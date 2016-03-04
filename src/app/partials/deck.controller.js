(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, $window) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.innerHeight = {height:$window.innerHeight+ 'px'};

    vm.getDecks = function () {
      //service will be used in future

      return[
        {id: 0, name: 'deck_0'},
        {id: 12, name: 'deck_1'},
        {id: 23, name: 'deck_2'},
        {id: 34, name: 'deck_3'}]
    };

    vm.categories = vm.getDecks();

    vm.selectDeck = function(value){
      vm.categories.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedDeck = entry;
          $state.go("deck", { id: value })
        }
      })
    };
    vm.selectDeck(vm.id);

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
