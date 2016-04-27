/**
 * INSTRUKCJA OBSŁUGI
 *
 * getDeckById(id) - zwraca talię po jej ID
 * getDecks(access) - zwraca wszystkie talie (obiekty typu Deck)
 *    access: 'public'|'private'
 * createNewDeck(name, access) - tworzy (na serwerze) nową talię
 *    access: 'public'|'private'
 *
 * Deck [klasa]:
 *  > pola:
 *  id - identyfikator talii, ustalany przez serwer
 *  name - nazwa talii
 *  isPublic - poziom dostępu
 *  flashcards - lista fiszek
 *
 *  > metody (wszystkie zwracają promise):
 *  getFlashcards() - pobiera fiszki i przypisuje je do siebie
 *  addNewFlashcard() - tworzy nową fiszkę i przypisuje ją do siebie
 *  rename(name) - zmienia nazwę talii
 *  changeAccess(new_access) - zmienia talię na publiczną/prywatną
 *  remove() - usuwa talię z bazy danych
 */

(function() {
  'use strict';
  angular
    .module('backend')
    .service('BackendService', BackendService);

  /** @ngInject */
  function BackendService($http, $q) {

    this.getDeckById = getDeckById;
    this.getDecks = getDecks;
    this.createNewDeck = createNewDeck;

    /* *** */

    var Deck = DeckFactory.Deck;

    function getDeckById(id) {
      if(!id)
        throw_error('must specify deck id');

      var method = 'GET';
      var url = '/api/decks/' + id;

      return promiseWithDeck(method, url);
    }

    function throw_error(message) {
      alert(message);
      throw message;
    }

    function promiseWithDeck(method, url) {
      var promise = $http({method: method, url: url})
      .then(
        function success(response) {
          var deck = new Deck();
          deck.id = response.data.id;
          deck.name = response.data.name;
          deck.isPublic = response.data.isPublic;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

      return promise;
    }

    function getDecks(access) {
      if(!access)
        access = 'public';

      var method = 'GET';

      var url;
      if(access == 'private')
        url = '/api/decks/me';
      else if(access == 'public')
        url = '/api/decks';
      else
        throw_error('wrong access (must be `public`|`private`)');

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

      return newDeckPromise(method, url, data);
    }

    function newDeckPromise(method, url, data) {
      var promise = $http({method: method, url: url, data: data})
      .then(
        function success(response) {
          var deck = new Deck();
          deck.name = response.data.name;
          deck.id = response.data.id;
          deck.isPublic = response.data.isPublic;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );
      return promise;
    }
  }

})();
