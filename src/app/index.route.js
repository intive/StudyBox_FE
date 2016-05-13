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
        onEnter: redirectToDecksIfIsLogged
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

    function redirectToDecksIfIsLogged(LoginHelperService, $state) {
      if(LoginHelperService.isLogged())
        $state.go('decks', {access: 'private'});
    }
  }

})();
