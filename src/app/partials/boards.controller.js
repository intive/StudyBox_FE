(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('BoardsController', BoardsController);

  /** @ngInject */
  function BoardsController() {
    var vm = this;

    var getBoards = function () {
      //service will be used in future
      return[
        {id: 0, name: 'board_0'},
        {id: 1, name: 'board_1'},
        {id: 2, name: 'board_2'},
        {id: 3, name: 'board_3'}]
    };

    vm.categories = getBoards()
    }

})();
