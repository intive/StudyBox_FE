(function() {
  'use strict';

  angular
    .module('navbar')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('navbar', {
      templateUrl: 'app/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'navbar',
      params: {access: 'private'}
    });

    $urlRouterProvider.otherwise('/');
  }

})();
