(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        params: {
          loginRequired: false
        },
        onEnter: tryRedirectToDecks
      })
      .state('login/:deckId/:deckEdit', {
        url: '/:deckId/:deckEdit',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        params: {
          loginRequired: false
        }
      });

    $urlRouterProvider.otherwise('/');

    function tryRedirectToDecks($state, $timeout, LoginHelperService) {
      if(LoginHelperService.isLogged()) {
        $timeout(function(){
          $state.go('decks', {access: 'private'});
        });
      }
    }
  }

})();
