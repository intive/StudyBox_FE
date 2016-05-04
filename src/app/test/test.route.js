(function() {
  'use strict';

  angular
    .module('test')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('test', {
      parent: 'navbar',
      url: '/test/:deckId',
      templateUrl: 'app/test/test.html',
      controller: 'TestController',
      controllerAs: 'test'
    });



    $urlRouterProvider.otherwise('/');
  }

})();
