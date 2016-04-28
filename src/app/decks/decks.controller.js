(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $log, $stateParams,
                           orderByLocaleAwareConfig) {
    var vm = this;
    vm.getDecks = getDecks;
    vm.count = true;

    orderByLocaleAwareConfig.localeId = 'pl';

    function getDecks() {
      vm.access = $stateParams.access;
      BackendService.getDecks(vm.access, vm.count)
      .then(function (result) {
        vm.categories=result;
      }, function (e) {
        $log.error(e);
      });
    }

    getDecks();
  }

})();
