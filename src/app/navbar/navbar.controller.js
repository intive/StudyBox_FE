(function() {
  'use strict';

  angular
  .module('navbar')
  .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, $timeout, $q, $log, $document, BackendService, $mdSidenav, $stateParams, LoginHelperService, md5, $mdDialog, $translate) {

    var vm = this;
    vm.uiRouterState = $state;

    vm.access = $stateParams.access;

    vm.openLeftMenu = openLeftMenu;
    vm.showPrivateCards = showPrivateCards;
    vm.showPublicCards = showPublicCards;

    vm.selectDeck = selectDeck;
    vm.querySearch  = querySearch;
    vm.newDeck = newDeck;
    vm.changePage = changePage;

    vm.userLogout = userLogout;

    vm.getUserEmail = getUserEmail;
    vm.isLogged = isLogged;
    vm.generateGravatarUrl = generateGravatarUrl;

    vm.notLogged = notLogged;

    function notLogged(ev){

          var confirm = $mdDialog.confirm()
                .title($translate.instant('navbar-DIALOG_TITLE'))
                .textContent($translate.instant('navbar-DIALOG_TEXT_CONTENT'))
                .ariaLabel($translate.instant('navbar-DIALOG_ARIA_LABEL'))
                .targetEvent(ev)
                .ok($translate.instant('navbar-DIALOG_OK'))
                .cancel($translate.instant('navbar-DIALOG_CANCEL'));
          $mdDialog.show(confirm).then(function() {
            $state.go("login");
          });
      }


    function generateGravatarUrl(email)
    {
      var url = email.trim();
      url = url.toLowerCase();
      url = md5.createHash(url || '');
      url = url+"?s=100&d=mm";
      return url;
    }

    function isLogged() {
      return LoginHelperService.isLogged();
    }

    function getUserEmail() {
      return LoginHelperService.getUserEmail();
    }

    function userLogout() {
      LoginHelperService.doLogout();
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

    function selectDeck(item) {
      if (item) {
        var url;
        if(vm.access == 'private') {
          url = 'deck.addCard';
        } else {
          url = 'deck-preview';
        }
        $state.go(url, {deckId: item.id});
        item = null;
      }
    }

    function newDeck() {
      vm.searchText = null;
      $state.go("deck.addCard");
    }

    function changePage() {

      var url;
      if(vm.access == 'private') {
        url = 'deck.addCard';
      } else {
        url = 'deck-preview';
      }

      if (vm.selectedItem === null) {
        $state.go(url);
      } else {
        if (vm.searchText !== "")
          $state.go(url, {deckId: vm.selectedItem.id});
        else
          $state.go(url);
      }
    }

    function querySearch (query) {

      if (!vm.decks)
        vm.decks = BackendService.getDecks(vm.access);

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
        if(deck.name)
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
    }
  }

})();
