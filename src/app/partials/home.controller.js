(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController() {
    var vm = this;
    vm.boards = [
      {id:0, name:'board_1'},
      {id:1, name:'board_2'},
      {id:2, name:'board_3'},
      {id:3, name:'board_4'}]
    }

})();
