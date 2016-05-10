(function() {
  'use strict';

  angular
  .module('navbar')
  .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($state, md5, BackendService, $mdSidenav,
                            LoginHelperService, $mdDialog, $translate,
                            DecksService, $stateParams, $scope) {

    var vm = this;
    vm.uiRouterState = $state;

    vm.access = $stateParams.access;
    vm.openLeftMenu = openLeftMenu;
    vm.showPrivateCards = showPrivateCards;
    vm.showPublicCards = showPublicCards;

    vm.trimInput = trimInput;
    vm.querySearch  = querySearch;

    vm.userLogout = userLogout;
    vm.userLogin = userLogin;

    vm.getUserEmail = getUserEmail;
    vm.isLogged = isLogged;

    vm.generateGravatarUrl = generateGravatarUrl;
    vm.drawRandomDeck = drawRandomDeck;

    vm.notLogged = notLogged;

    vm.inputVisible = false;
    vm.finishSearching = finishSearching;

    DecksService.addObserver(vm);
    vm.notify = function() {};

    finishSearchingOnStateChange();

    ///////////

    function notifyObservers(decks) {
      DecksService.notifyObservers(decks);
    }

    function showPrivateCards() {
      $state.go("decks", {access: 'private'});
      $mdSidenav('left').toggle();
    }

    function showPublicCards() {
      $state.go("decks", {access: 'public'});
      $mdSidenav('left').toggle();
    }

    function trimInput() {
      vm.searchText = vm.searchText.trim();

      if(vm.searchText.length > 100)
        vm.searchText = vm.searchText.slice(0, 100);
    }

    function querySearch() {
      if(vm.searchText.length < 2) {
        notifyObservers([]);
        return;
      }

      getDecksByName(vm.searchText);
    }

    function getDecksByName() {
      return BackendService.getDecksByName(vm.searchText).then(
        function success(decks) {
          notifyObservers(decks);
        },
        function error() {
          notifyObservers([]);
        }
      );
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

    function finishSearching(reloadDecks) {
      if(vm.inputVisible) {
        vm.inputVisible = false;
        if(reloadDecks)
          getPrivateDecks();
        vm.searchText = '';
      }
      else
        vm.inputVisible = true;
    }

    function getPrivateDecks() {
      BackendService.getDecks('private', true)
      .then(
        function success(decks) {
          notifyObservers(decks);
      },
        function error() {
          notifyObservers(false);
        }
      );
    }

    function finishSearchingOnStateChange() {
      $scope.$on('$stateChangeStart', function(event, toState,
                                               toParams, fromState) {
        if(fromState.name == 'decks')
          finishSearching(false);
      });
    }
  }

})();
