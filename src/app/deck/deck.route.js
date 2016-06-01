(function() {
  'use strict';

  angular
    .module('deck')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('my-deck-preview-new-card', {
        parent: 'navbar',
        url: '/my-deck-preview/',
        templateUrl: 'app/deck/my-deck-preview.page.html',
        controller: 'MyDeckPreviewController',
        controllerAs: 'myDeckPreview'
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
          onEnter: function(LoginHelperService, $state, $stateParams, BackendService, $translate){

            var deckId = $stateParams.deckId;
            if(deckId == ""){
              $state.go("login")
            }

            BackendService.getDeckById(deckId)
            .then(function success(data) {
            if(LoginHelperService.getUserEmail() != data.creatorEmail){
              alert($translate.instant("deck-NOT_AN_OWNER"));
              if(LoginHelperService.isLogged()){
              $state.go("decks");
            }
            else{
              $state.go("decks", {access: "public"});
            }
            }
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
