(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('BoardController', BoardController);

  /** @ngInject */
  function BoardController($stateParams) {
    var vm = this;
    vm.id = $stateParams.id;

    var getBoards = function () {
      //service will be used in future
      return[
        {id: 0, name: 'board_0'},
        {id: 1, name: 'board_1'},
        {id: 2, name: 'board_2'},
        {id: 3, name: 'board_3'}]
    };

    vm.categories = getBoards();
    vm.selected = vm.categories[vm.id].name;
    console.log(vm.selected);

    var getCards = function () {
      //service will be used in future
      return[
        {id:0, name:vm.selected+'_card_0', question:'question', hint:'hint', answer:'answer'},
        {id:1, name:vm.selected+'_card_1', question:'question', hint:'hint', answer:'answer'},
        {id:2, name:vm.selected+'_card_2', question:'question', hint:'hint', answer:'answer'},
        {id:3, name:vm.selected+'_card_3', question:'question', hint:'hint', answer:'answer'}];

    };

    vm.cards = getCards();

    return vm
    }



})();
