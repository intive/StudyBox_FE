(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $log, $stateParams,
                           orderByLocaleAwareConfig, DecksService) {
    var vm = this;
    vm.getDecks = getDecks;
    vm.count = true;
    vm.access = null;

    DecksService.addObserver(vm);
    vm.notify = notify;

    orderByLocaleAwareConfig.localeId = 'pl';

    /////////////////

    function notify(decks) {
      vm.access = 'public';
      vm.categories = decks;
    }

    function getDecks() {
      vm.access = 'private';
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
