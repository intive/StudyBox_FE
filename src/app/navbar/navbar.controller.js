(function() {
  'use strict';

  angular
  .module('navbar')
  .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, $timeout, $q,
    $log, $document, BackendService,
    $mdSidenav, $stateParams, LoginService) {
    var vm = this;
    vm.uiRouterState = $state;

    vm.access = $stateParams.access;

    vm.openLeftMenu = openLeftMenu;
    vm.showPrivateCards = showPrivateCards;
    vm.showPublicCards = showPublicCards;

    vm.selectDeck = selectDeck;
    vm.querySearch  = querySearch;
    vm.newDeck = newDeck;
    vm.buttonClick = buttonClick;
    vm.changePage = changePage;
    vm.changeButton = angular.element($document[0].querySelector('#searchAutocomplete')).hasClass('searchForm');

    vm.userLogout = userLogout;

    function userLogout() {
      LoginService.doLogout();
      $mdSidenav('left').toggle();
      $state.go('login');
    }

    function openLeftMenu() {
      $mdSidenav('left').toggle();
    }

    function showPrivateCards() {
      $state.go("decks", {access: 'private'});
      $mdSidenav('left').toggle();
    }

    function showPublicCards() {
      $state.go("decks", {access: 'public'});
      $mdSidenav('left').toggle();
    }

    function buttonClick(){

      var search = angular.element($document[0].querySelector('#searchAutocomplete'));

      if(search.hasClass('searchForm'))
      {
        vm.searchText = "";
        angular.element($document[0].querySelector('#searchButton')).addClass('darkButton');
        angular.element($document[0].querySelector('#searchButton2')).addClass('ng-hide');
        angular.element($document[0].querySelector('#searchButton3')).removeClass('ng-hide');
        angular.element($document[0].querySelector('#searchAutocomplete')).removeClass('searchForm');
        angular.element($document[0].querySelector('#searchAutocomplete')).addClass('showUp');
        $timeout(function(){angular.element($document[0].querySelector('#searchInput')).focus();},330);
      }
      else
      {
        angular.element($document[0].querySelector('#searchButton')).removeClass('darkButton');
        angular.element($document[0].querySelector('#searchButton2')).removeClass('ng-hide');
        angular.element($document[0].querySelector('#searchButton3')).addClass('ng-hide');
        angular.element($document[0].querySelector('#searchAutocomplete')).removeClass('showUp');
        angular.element($document[0].querySelector('#searchAutocomplete')).addClass('searchForm');
      }

    }


    function selectDeck(item) {

      if (item){

        var url;
        if(vm.access == 'private')
          url = 'deck.addCard';
        else
          url = 'deck-preview';

        $state.go(url, {deckId: item.id});


        item = null;

      }

    }

    function newDeck() {
      vm.searchText = null;
      $state.go("deck.addCard")
    }

    function changePage() {

      var url;
      if(vm.access == 'private')
        url = 'deck.addCard';
      else
        url = 'deck-preview';


      if (vm.selectedItem == null){
        $state.go(url)
      }
      else
      {



        if (vm.searchText != "")
        {
          $state.go(url, {deckId: vm.selectedItem.id});
        }
        else
        {

          $state.go(url);
        }

      }

    }

    function querySearch (query) {

      if (!vm.decks) {
        vm.decks = BackendService.getDecks(vm.access);
      }
      return vm.decks
      .then(function (result) {
        var list = query ? result.filter(createFilterFor(query)) : result,
        deferred;


        deferred = $q.defer();
        $timeout(function () { deferred.resolve( list ); }, Math.random() * 1000, false);

        return deferred.promise;
      });

    }




    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        if(deck.name){
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        }
      };
    }


  }

})();
