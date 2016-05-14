(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $stateParams, $state,
                           orderByLocaleAwareConfig, DecksService,
                           LoginHelperService) {
    var vm = this;
    vm.getDecks = getDecks;
    vm.count = true;
    vm.access = null;
    vm.no_private_decks = true;

    DecksService.controller = vm;
    vm.onDecksChange = onDecksChange;

    orderByLocaleAwareConfig.localeId = 'pl';

    /////////////////

    function getRandomDecks() {
      vm.randomCategories = [];

      for(var i = 0; i < 3; i++)
        BackendService.drawRandomDeck().then(success, error);

      function success(response) {
        vm.randomCategories.push(response.data);
      }

      function error(response) {
        alert(response);
      }
    }

    function onDecksChange(decks) {
      vm.access = 'public';
      vm.no_private_decks = (decks === false) ? true : false;
      vm.categories = (vm.no_private_decks) ? [] : decks;
    }

    function getDecks() {
      var state = $state.current.name;

      if(LoginHelperService.isLogged() && state == 'decks') {
        getPrivateDecks();
      }
      else if(!LoginHelperService.isLogged() && state == 'decks') {
        getRandomDecks();
      }
      else if(state == 'decks-search') {
        vm.categories = DecksService.getDecks();
        vm.access = 'public';
      }
    }

    function getPrivateDecks() {
      vm.access = 'private';
      BackendService.getDecks(vm.access, vm.count)
      .then(
        function success(result) {
        vm.categories = result;
        vm.no_private_decks = (result) ? false : true;
      }, function error() {
        vm.categories = [];
        vm.no_private_decks = true;
      });
    }

    getDecks();
  }

})();
