(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $log) {
    var vm = this;
    vm.isOpen = false;
    vm.SearchIsOpen = false;
    vm.toggle = toggle;
    vm.getDecks = getDecks;

    function getDecks() {
      BackendService.getDecks()
        .then(function (result) {
          $log.log(result)
          vm.categories=result
          }, function (e) {
            $log.error(e);
          });
    }

    getDecks();

    function toggle(){
      vm.SearchIsOpen = !vm.SearchIsOpen;
    }

    }

})();
