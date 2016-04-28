(function() {
  'use strict';

  angular
    .module('decks')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('decks', {
      parent: 'navbar',
      url: '/decks',
      templateUrl: 'app/decks/decks.html',
      controller: 'DecksController',
      controllerAs: 'decks',
      params: {
        access: 'private'
      },
      onEnter: function($state, $stateParams, LoginHelperService) {
        if ($stateParams.access === 'private' && !LoginHelperService.isLogged()) {
          $state.go('login');
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  }

})();
