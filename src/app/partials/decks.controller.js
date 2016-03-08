(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController() {
    var vm = this;

    var getDecks = function () {
      //service will be used in future
      return[
        {id: 0, name: 'deck_0'},
        {id: 12, name: 'deck_1'},
        {id: 23, name: 'deck_2'},
        {id: 34, name: 'deck_3'}]
    };

    vm.decks = getDecks()
    }

})();
