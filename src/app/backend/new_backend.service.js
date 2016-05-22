(function() {
  'use strict';
  angular
    .module('new_backend')
    .service('BackendService', BackendService);

  /** @ngInject */
  function BackendService($http, $q, DeckFactory) {

    this.getDeckById = getDeckById;
    this.getDecks = getDecks;
    this.createNewDeck = createNewDeck;
    this.drawRandomDeck = drawRandomDeck;

    /* *** */

    var Deck = DeckFactory.Deck;

    function getDeckById(id) {
      if(!id)
        throw_error('must specify deck id');

      var method = 'GET';
      var url = '/api/decks/' + id;

      return promiseWithDeck(method, url, {});
    }

    function throw_error(message) {
      alert(message);
      throw message;
    }

    function promiseWithDeck(method, url, data) {
      var promise = $http({method: method, url: url, data: data})
      .then(
        function success(response) {
          var deck = new Deck();
          deck.id = response.data.id;
          deck.name = response.data.name;
          deck.isPublic = response.data.isPublic;
          deck.creatorEmail = response.data.creatorEmail;
          deck.creationDate = response.data.creationDate;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

      return promise;
    }

    function getDecks(access, count) {
      if(!access)
        access = 'public';

      if(!count)
        count = false;

      var method = 'GET';

      var url;
      if(access == 'private')
        url = '/api/decks/me';
      else if(access == 'public')
        url = '/api/decks';
      else
        throw_error('wrong access (must be `public`|`private`)');

      if(count)
        url += '?flashcardsCount=true';

      return promiseWithDecks(method, url);
    }

    function promiseWithDecks(method, url) {
      var promise = $http({method: method, url: url})
      .then(
        function success(response) {
          return jsonToDecks(response);
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );
      return promise;
    }

    function jsonToDecks(response) {
      var decks = [];
      for(var i = 0; i < response.data.length; i++) {
        var deck = new Deck();

        deck.name = response.data[i].name;
        deck.id = response.data[i].id;
        deck.isPublic = response.data[i].isPublic;
        if(response.data[i].flashcardsCount)
          deck.flashcardsCount = response.data[i].flashcardsCount;
        deck.creatorEmail = response.data[i].creatorEmail;
        deck.creationDate = response.data[i].creationDate;

        decks.push(deck);
      }
      return decks;
    }

    function createNewDeck(name, access) {
      if(!name)
        throw_error('must specify deck name');

      var isPublic;
      if(access == 'public')
        isPublic = true;
      else if(access == 'private')
        isPublic = false;
      else
        isPublic = false;

      var method = 'POST';
      var url = '/api/decks';
      var data = {name: name, isPublic: isPublic};

      return promiseWithDeck(method, url, data);
    }

    function drawRandomDeck() {
      var method = 'GET';
      var url = '/api/decks/random';

      return promiseWithDeck(method, url, {});
    }
  }

})();
