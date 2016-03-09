(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .service('DeckService', ['$http', function ($http) {
      return {
        getCards: function (id) {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks/'+id+'/flashcards'
          };
          return $http(req);
        },
        deleteCard: function (deckId, cardId) {
          var req = {
            method: 'DELETE',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks/'+deckId+'/flashcards/'+cardId
          };
          return $http(req);
        },
        createDeck: function (name) {
          var req = {
            method: 'POST',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks',
            data: {"name": name}
          };
          return $http(req);
        },
        getDeck: function (id) {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks/'+id
          };
          return $http(req);
        },
        getDecks: function () {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks'
          };
          return $http(req);
        }
      }
    }])

})();
