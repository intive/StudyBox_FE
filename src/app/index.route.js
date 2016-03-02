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
        template: '{{"studyBoxFe_stringTestowy" | translate}} draniu'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
