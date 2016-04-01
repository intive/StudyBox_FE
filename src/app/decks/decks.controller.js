(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $log, $stateParams) {
    var vm = this;
    vm.getDecks = getDecks;

    function getDecks() {
      vm.access = $stateParams.access;
      BackendService.getDecks(vm.access)
      .then(function (result) {
        vm.categories=result;
      }, function (e) {
        $log.error(e);
      });
    }

    getDecks();

  }

})();
