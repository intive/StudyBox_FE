(function() {
  'use strict';

  angular
  .module('navbar')
  .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, $timeout, $q, $log, $document, md5,
                            BackendService, $mdSidenav, $stateParams,
                            LoginHelperService, $mdDialog, $translate,
                            DecksService) {

    var vm = this;
    vm.uiRouterState = $state;

    vm.decks = null;

    vm.access = $stateParams.access;
    vm.openLeftMenu = openLeftMenu;
    vm.showPrivateCards = showPrivateCards;
    vm.showPublicCards = showPublicCards;

    vm.querySearch  = querySearch;

    vm.userLogout = userLogout;
    vm.userLogin = userLogin;

    vm.getUserEmail = getUserEmail;
    vm.isLogged = isLogged;

    vm.generateGravatarUrl = generateGravatarUrl;
    vm.drawRandomDeck = drawRandomDeck;

    vm.notLogged = notLogged;

    vm.finishSearching = finishSearching;

    DecksService.addObserver(vm);
    vm.notify = function() {};

    ///////////

    var _timeout = null;

    function notifyObservers() {
      DecksService.notifyObservers(vm.decks);
    }

    function showPrivateCards() {
      $state.go("decks", {access: 'private'});
      $mdSidenav('left').toggle();
    }

    function showPublicCards() {
      $state.go("decks", {access: 'public'});
      $mdSidenav('left').toggle();
    }

    function querySearch() {
      vm.searchText = vm.searchText.trim();

      if(vm.searchText.length < 2) {
        vm.decks = [];
        notifyObservers();
        return;
      }

      if(vm.searchText.length > 10)
        vm.searchText = vm.searchText.slice(0, 10);

      if(_timeout)
        $timeout.cancel(_timeout);

      var delayed = function() {
        if(vm.searchText) {
          getDecksByName(vm.searchText);
          _timeout = null;
        }
      };
      _timeout = $timeout(delayed,500);
    }

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

    function drawRandomDeck()
    {
      BackendService.drawRandomDeck().then(
        function success(response) {
          $state.go("deck-preview",{deckId: response.data[0].id});
          openLeftMenu();
        },
        function error(message) {
          alert(message);
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

    function getDecksByName() {
      return BackendService.getDecksByName(vm.searchText).then(
        function success(decks) {
          vm.decks = decks;
          notifyObservers(vm.decks);
        },
        function error() {}
      );
    }

    function getPrivateDecks() {
      BackendService.getDecks('private', true)
      .then(
        function success(decks) {
          vm.decks = decks;
          notifyObservers();
      },
        function error() {}
      );
    }

    function finishSearching(expand) {
      if(!expand) {
        getPrivateDecks();
        vm.searchText = '';
      }
    }
  }

})();
