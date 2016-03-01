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
        templateUrl: 'app/partials/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('boards', {
        parent: 'home',
        url: 'boards',
        templateUrl: 'app/partials/boards.html',
        controller: 'BoardsController',
        controllerAs: 'boards'
      })
      .state('board', {
        parent: 'home',
        url: 'board/:id',
        templateUrl: 'app/partials/board.html',
        controller: 'BoardController',
        controllerAs: 'board'
      });
      //.state('board.card', {
      //  parent: 'board',
      //  url: '/:card_id',
      //  templateUrl: 'app/partials/card.html',
      //  controller: 'CardController',
      //  controllerAs: 'card'
      //});

    $urlRouterProvider.otherwise('/boards');
  }

})();
