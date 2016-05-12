(function() {
  'use strict';

  angular
    .module('decks')
    .controller('DecksController', DecksController);

  /** @ngInject */
  function DecksController(BackendService, $stateParams,
                           orderByLocaleAwareConfig, DecksService, $window, $scope) {
    var vm = this;
    vm.getDecks = getDecks;
    vm.count = true;
    vm.access = null;
    vm.no_private_decks = true;
    vm.parameter = $stateParams.access;
    vm.isWide = isWide;
    vm.isMedium = isMedium;
    vm.isNarrow = isNarrow;
    vm.randomDecks = randomDecks;

    DecksService.addObserver(vm);
    vm.notify = notify;

    orderByLocaleAwareConfig.localeId = 'pl';

    /////////////////

    function randomDecks(){
      vm.randomCategories= [];
      for(var i = 0; i < 3; i++) {
      BackendService.drawRandomDeck().then(
        function success(response) {
        vm.randomCategories.push(response.data)
        },
        function error(message) {
          alert(message);
        });
    }
    }

    function isWide(){
        return $window.innerWidth >= 960;
    }

    function isMedium(){
        return $window.innerWidth >= 600 && $window.innerWidth < 960;
    }

    function isNarrow(){
        return $window.innerWidth < 600;
    }

    function notify(decks) {
      vm.access = 'public';
      vm.no_private_decks = (decks === false) ? true : false;
      vm.categories = (vm.no_private_decks) ? [] : decks;
    }

    function getDecks() {
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

    if(vm.parameter == "public"){
      randomDecks();
    }

      angular.element($window).on('resize', angular.bind($scope, $scope.$apply));

  }

})();
