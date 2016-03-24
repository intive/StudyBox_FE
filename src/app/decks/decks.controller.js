(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $log) {
    var vm = this;
    vm.getDecks = getDecks;

    function getDecks() {
      BackendService.getDecks()
        .then(function (result) {
          $log.log(result);
          vm.categories=result;
          }, function (e) {
            $log.error(e);
          });
    }

    getDecks();

    }

})();
