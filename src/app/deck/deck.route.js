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
        onEnter: function(LoginHelperService, $state, $stateParams, NewbackendService,DeckFactory){

            var deck = new DeckFactory.Deck();
            deck.id = $stateParams.deckId;

            NewbackendService.getDeckById(deck.id)
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
            $state.go("login/:deckId/:deckEdit", {"deckId": deck.id, "deckEdit": "d-p"});
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
          onEnter: function(LoginHelperService, $state, $stateParams, NewbackendService, $translate,DeckFactory){

            var deck = new DeckFactory.Deck();
            deck.id = $stateParams.deckId;

            if(deck.id == ""){
              $state.go("login")
            }

            NewbackendService.getDeckById(deck.id)
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
            $state.go("login/:deckId/:deckEdit", {"deckId": deck.id, "deckEdit": null});
            LoginHelperService.doLogout();
          }
          })

          }
        });

    $urlRouterProvider.otherwise('/');
  }

})();
