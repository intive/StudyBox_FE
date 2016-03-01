(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('BoardController', BoardController);

  /** @ngInject */
  function BoardController($stateParams, $state) {
    var vm = this;
    vm.id = $stateParams.id;

    vm.getBoards = function () {
      //service will be used in future

      return[
        {id: 0, name: 'board_0'},
        {id: 12, name: 'board_1'},
        {id: 23, name: 'board_2'},
        {id: 34, name: 'board_3'}]
    };

    vm.categories = vm.getBoards();

    vm.selectBoard = function(value){
      vm.categories.forEach(function(entry) {
        if (entry.id == value){
          vm.selectedBoard = entry;
          $state.go("board", { id: value })
        }
      })
    };
    vm.selectBoard(vm.id);
    
    vm.setCards = function () {
      //service will be used in future
      vm.cards = [
        {id:0, name:vm.selectedBoard.name+'_card_0', question:'question', hint:'hint', answer:'answer'},
        {id:11, name:vm.selectedBoard.name+'_card_1', question:'question', hint:'hint', answer:'answer'},
        {id:26, name:vm.selectedBoard.name+'_card_2', question:'question', hint:'hint', answer:'answer'},
        {id:39, name:vm.selectedBoard.name+'_card_3', question:'question', hint:'hint', answer:'answer'}];

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
