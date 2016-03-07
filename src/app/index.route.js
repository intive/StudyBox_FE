(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: 'Study Box Front-end'
        })
        .state('addCard', {
            url: '/addCard',
            controller: 'AddCardController',
            controllerAs: 'AddCardController',
            templateUrl: 'app/addCard/addCard.html'
        });

    $urlRouterProvider.otherwise('/');
  }

})();
