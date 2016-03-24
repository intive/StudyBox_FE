(function() {
  'use strict';

  angular
    .module('navbar')
    .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, $timeout, $q, $log, $document, BackendService) {
    var vm = this;
    vm.uiRouterState = $state

    vm.getDecks = getDecks;
    vm.decks = getDecks();
    vm.querySearch  = querySearch;
    vm.newDeck = newDeck;
    vm.buttonClick = buttonClick;
    vm.changePage = changePage;
    vm.changeButton = angular.element($document[0].querySelector('#searchAutocomplete')).hasClass('searchForm');

    function buttonClick(){

      var search = angular.element($document[0].querySelector('#searchAutocomplete'));

      if(search.hasClass('searchForm'))
      {
      angular.element($document[0].querySelector('#searchButton')).addClass('darkButton');
      angular.element($document[0].querySelector('#searchButton2')).addClass('ng-hide');
      angular.element($document[0].querySelector('#searchButton3')).removeClass('ng-hide');
      angular.element($document[0].querySelector('#searchAutocomplete')).removeClass('searchForm');
      angular.element($document[0].querySelector('#searchAutocomplete')).addClass('showUp');
      $timeout(function(){angular.element($document[0].querySelector('#searchInput')).focus();},302);
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


    function newDeck() {
      vm.searchText = null;
      $state.go("deck")
    }

    function changePage() {
      vm.searchText = null;
      $state.go("deck", {deckId: vm.selectedItem.id})
    }

    function querySearch (query) {
      var results = query ? vm.decks.filter( createFilterFor(query) ) : vm.decks,
          deferred;


        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
    }

    function getDecks() {

    BackendService.getDecks()
        .then(function (result) {
          vm.decks=result;
          }, function (e) {
           $log.error(e);
        });

      }



    function createFilterFor(query) {
      return function filterFn(deck) {
        return (deck.name.indexOf(query) === 0);
      };
    }


  }

})();
