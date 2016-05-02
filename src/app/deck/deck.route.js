(function() {
  'use strict';

  angular
    .module('deck')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('deck', {
        parent: 'navbar',
        url: '/deck-edit/:deckId',
        templateUrl: 'app/deck/deck.page.html',
        params: {access: 'private'},
        onEnter: function(LoginHelperService, $state, $stateParams, BackendService){

          var deckId = $stateParams.deckId;

          BackendService.getDeckById(deckId)
          .then(function success() {
        },
        function error(data){
          if(data.code == 400 || data.code == 404){
            alert(data.message);
            if(LoginHelperService.isLogged()){
              $state.go("decks");
            }
            else{
              $state.go("decks", {access: "public"});
            }
          }
          else{
          alert(data.message);
          $state.go("login/:deckId/:deckEdit", {"deckId": deckId, "deckEdit": "d-e"});
          LoginHelperService.doLogout();
        }
        })

        }
      })
      .state('deck.addCard', {
        parent: 'deck',
        url: '/:cardId',
        templateUrl: 'app/addCard/addCard.html',
        controller: 'AddCardController',
        controllerAs: 'addCard'
      })
      .state('deck-preview', {
        parent: 'navbar',
        url: '/deck-preview/:deckId',
        controller: 'DeckPreviewController',
        controllerAs: 'deckPreview',
        templateUrl: 'app/deck/deck-preview.page.html',
        onEnter: function(LoginHelperService, $state, $stateParams, BackendService){

            var deckId = $stateParams.deckId;

            BackendService.getDeckById(deckId)
            .then(function success() {
          },
          function error(data){
            if(data.code == 400 || data.code == 404){
              alert(data.message);
              if(LoginHelperService.isLogged()){
                $state.go("decks");
              }
              else{
                $state.go("decks", {access: "public"});
              }
            }
            else{
            alert(data.message);
            $state.go("login/:deckId/:deckEdit", {"deckId": deckId, "deckEdit": "d-p"});
            LoginHelperService.doLogout();
          }
          })
          }
      })
      .state('my-deck-preview', {
          parent: 'navbar',
          url: '/my-deck-preview/:deckId',
          controller: 'MyDeckPreviewController',
          controllerAs: 'myDeckPreview',
          templateUrl: 'app/deck/my-deck-preview.page.html',
          onEnter: function(LoginHelperService, $state, $stateParams, BackendService){

            var deckId = $stateParams.deckId;

            BackendService.getDeckById(deckId)
            .then(function success() {
          },
          function error(data){
            if(data.code == 400 || data.code == 404){
              alert(data.message);
              if(LoginHelperService.isLogged()){
                $state.go("decks");
              }
              else{
                $state.go("decks", {access: "public"});
              }
            }
            else{
            alert(data.message);
            $state.go("login/:deckId/:deckEdit", {"deckId": deckId, "deckEdit": null});
            LoginHelperService.doLogout();
          }
          })

          }
        });

    $urlRouterProvider.otherwise('/');
  }

})();
