(function() {
  'use strict';

  angular
  .module('navbar')
  .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, $timeout, $q, $log, $document, md5,
                            BackendService, $mdSidenav, $stateParams,
                            LoginHelperService, $mdDialog, $translate) {

    var vm = this;
    vm.uiRouterState = $state;

    vm.decks = null;

    vm.access = $stateParams.access;

    vm.openLeftMenu = openLeftMenu;
    vm.showPrivateCards = showPrivateCards;
    vm.showPublicCards = showPublicCards;

    vm.selectDeck = selectDeck;
    vm.querySearch  = querySearch;
    vm.newDeck = newDeck;
    vm.changePage = changePage;

    vm.userLogout = userLogout;
    vm.userLogin = userLogin;

    vm.getUserEmail = getUserEmail;
    vm.isLogged = isLogged;
    vm.generateGravatarUrl = generateGravatarUrl;

    vm.notLogged = notLogged;

    vm.clearTextOnInputClose = clearTextOnInputClose;

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


    function generateGravatarUrl(email) {
      if(!email)
        return;

      var url = email.trim();
      url = url.toLowerCase();
      url = md5.createHash(url || '');
      url = url+"?size=100&d=mm";
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

    function userLogin() {
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
        $state.go('deck-preview', {deckId: item.id});
        item = null;
      }
    }

    function newDeck() {
      vm.searchText = null;
      $state.go("deck.addCard");
    }

    function changePage() {
      if(vm.decks) {
        var deck = vm.decks[0];
        if(deck && vm.searchText === deck.name)
          $state.go('deck-preview', {deckId: deck.id, notify: true});
      }
    }

    function querySearch (query) {
      query = query.trim();
      if(query.length > 100)
        return;

      return BackendService.getDecksByName(query).then(
        function success(decks) {
          vm.decks = decks;
          return decks;
        },
        function error() {
          return [];
        });
    }

    function clearTextOnInputClose(expand) {
      if(!expand)
        vm.searchText = '';
    }
  }

})();
