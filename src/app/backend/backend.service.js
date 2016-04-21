/**
 * INSTRUKCJA OBSŁUGI
 *
 * getDeckById(id) - zwraca talię po jej ID
 * getDeckByName(name) - zwraca talię po nazwie
 * getDecks(access) - zwraca wszystkie talie (obiekty typu Deck)
 *    access: 'public'|'private'
 * createNewDeck(name, access) - tworzy (na serwerze) nową talię
 *    access: 'public'|'private'
 *
 * Deck [klasa]:
 *  > pola:
 *  id - identyfikator talii, ustalany przez serwer
 *  name - nazwa talii
 *
 *  > metody (wszystkie zwracają promise):
 *  getFlashcards() - zwraca listę fiszek dla danej talii
 *  createFlashcard(question, answer) - tworzy nową fiszkę
 *  updateFlashcard(id, question, answer) - uaktualnia fiszkę o wskazanym id
 *  removeFlashcard(id) - usuwa fiszkę
 *  changename(name) - zmienia nazwę talii
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
    this.getDeckByName = getDeckByName;
    this.getDecks = getDecks;
    this.createNewDeck = createNewDeck;

    this.Deck = Deck;  // class

    /* *** */

    function getDeckById(id) {
      if(angular.isUndefined(id) )
        show_error('must specify deck id');

      var method = 'GET';
      var url = '/api/decks/' + id;

      return promiseWithDeck(method, url);
    }

    function show_error(message) {
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
          deck.isPublic = response.data.publicVisible;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

      return promise;
    }

    function getDeckByName(name) {
      if(angular.isUndefined(name) )
        show_error('must specify deck name');

      var method = 'GET';
      var url = '/api/decks?name=' + name;

      return promiseWithDeck(method, url);
    }

    function getDecks(access) {
      if(angular.isUndefined(access))
        access = 'public';

      var method = 'GET';

      var url;
      if(access == 'private')
        url = '/api/decks/me';
      else if(access == 'public')
        url = '/api/decks';
      else
        show_error('wrong access (must be `public`|`private`)');

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
    }

    function createNewDeck(name, access) {
      if(angular.isUndefined(name))
        show_error('must specify deck name');

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
      var promise = $http(
        {
          method: method,
          url: url,
          data: data
        })
      .then(
        function success(response) {
          var deck = new Deck();
          deck.name = response.data.name;
          deck.id = response.data.id;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );
      return promise;
    }

    function Deck() {
      this.id = null;
      this.name = null;

      this.getFlashcards = getFlashcards;
      this.createFlashcard = createFlashcard;
      this.updateFlashcard = updateFlashcard;
      this.removeFlashcard = removeFlashcard;
      this.updateDeck = updateDeck;
      this.remove = remove;

      function getFlashcards() {
        var method = 'GET';
        /*jshint validthis:true */
        var url = "/api/decks/" + this.id + "/flashcards";
        var data = {};

        return simplePromise(method, url, data);
      }

      function createFlashcard(question, answer, isHidden) {
        if(angular.isUndefined(question) || angular.isUndefined(answer) )
          show_error('must specify question and answer');

        var method = 'POST';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards';
        var data = {question: question, answer: answer, isHidden: isHidden};

        return simplePromise(method, url, data);
      }

      function updateFlashcard(id, question, answer, isHidden) {
        if(angular.isUndefined(id) || angular.isUndefined(question) ||
           angular.isUndefined(answer) )
          show_error('must specify id, question and answer');

        var method = 'PUT';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards/' + id;

        var data = {question: question, answer: answer, isHidden: isHidden};

        return simplePromise(method, url, data);
      }

      function removeFlashcard(id) {
        if(angular.isUndefined(id) )
          show_error('must specify id');

        var method = 'DELETE';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards/' + id;
        var data = {};

        return simplePromise(method, url, data);
      }

      function updateDeck(new_name, access) {
        if(angular.isUndefined(new_name) )
          show_error('must specify new_name');

        var isPublic;
        if(access == 'public')
          isPublic = true;
        else if(access == 'private')
          isPublic = false;
        else
          isPublic = false;

        var method = 'PUT';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id;
        var data = {name: new_name, isPublic: isPublic};
        var $this = this;

        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            $this.name = response.data.name;
            return response.data;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );

        return promise;
      }

      function remove() {
        var method = 'DELETE';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id;
        var data = {};

        return simplePromise(method, url, data);
      }
    }

    function simplePromise(method, url, data) {
      return $http({method: method, url: url, data: data})
      .then(
        function success(response) {
          return response.data;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );
    }
  }

})();
