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
      }
    })
    .state('decks-search', {
      parent: 'navbar',
      url: '/decks-search',
      templateUrl: 'app/decks/decks.html',
      controller: 'DecksController',
      controllerAs: 'decks',
      params: {
        access: 'public'
      },
      onExit: tryClosingSearchBar
    });

    $urlRouterProvider.otherwise('/');

    function tryClosingSearchBar(NavbarService, $timeout) {
      var ctrl = NavbarService.controller;

      if(ctrl && ctrl.inputVisible) {
        $timeout(function(){
          ctrl.inputVisible = false;
        });
      }
    }
  }

})();
