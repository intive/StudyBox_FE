/**
 * INSTRUKCJA OBSŁUGI
 *
 * getDeckById(id) - zwraca talię po jej ID
 * getDeckByName(name) - zwraca talię po nazwie
 * getDecks(access) - zwraca wszystkie talie (obiekty typu Deck)
 *    access: 'public'|'private'|'all'
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
      if(angular.isUndefined(id) ) {
        var message = 'must specify deck id';
        alert(message);
        throw message;
      }
      var method = 'GET';
      var url = '/api/decks/' + id;

      return promiseWithDeck(method, url);
    }

    function promiseWithDeck(method, url) {
      var promise = $http({method: method, url: url})
      .then(
        function success(response) {
          var deck = new Deck();
          deck.id = response.data.id;
          deck.name = response.data.name;
          return deck;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

      return promise;
    }

    function getDeckByName(name) {
      if(angular.isUndefined(name) ) {
        var message = 'must specify deck name';
        alert(message);
        throw message;
      }
      var method = 'GET';
      var url = '/api/decks?name=' + name;

      return promiseWithDeck(method, url);
    }

    function getDecks(access) {
      if(angular.isUndefined(access))
        access = 'all';

      var method = 'GET';
      var url = '/api/decks';

      return promiseWithDecks(method, url, access);
    }

    function promiseWithDecks(method, url, access) {
      var promise = $http({method: method, url: url})
      .then(
        function success(response) {
          return jsonToDecks(response, access);
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

      return promise;

      function jsonToDecks(response, access) {
        if(access == 'public')
          return publicDecks();
        else if(access == 'private')
          return privateDecks();
        else if(access == 'all')
          return allDecks();
        else {
          var message = 'access can be `private`|`public`|`all`';
          alert(message);
          throw message;
        }

        function allDecks() {
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

        function publicDecks() {
          var _allDecks = allDecks();
          var decks = [];
          for(var i = 0; i < _allDecks.length; i++) {
            if(_allDecks[i].isPublic)
              decks.push(_allDecks[i]);
          }
          return decks;
        }

        function privateDecks() {
          var _allDecks = allDecks();
          var decks = [];
          for(var i = 0; i < _allDecks.length; i++) {
            if(_allDecks[i].isPublic === false)
              decks.push(_allDecks[i]);
          }
          return decks;
        }

      }
    }

    function createNewDeck(name, access) {
      if(angular.isUndefined(name)) {
        var message = 'must specify deck name';
        alert(message);
        throw message;
      }

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
      this.changeName = changeName;
      this.remove = remove;

      function getFlashcards() {
        var method = 'GET';
        /*jshint validthis:true */
        var url = "/api/decks/" + this.id + "/flashcards";
        var data = {};

        return simplePromise(method, url, data);
      }

      function createFlashcard(question, answer) {
        if(angular.isUndefined(question) || angular.isUndefined(answer) ) {
          var message = 'must specify question and answer';
          alert(message);
          throw message;
        }
        var method = 'POST';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards';
        var data = {question: question, answer: answer};

        return simplePromise(method, url, data);
      }

      function updateFlashcard(id, question, answer) {
        if(angular.isUndefined(id) || angular.isUndefined(question) ||
           angular.isUndefined(answer) ) {
          var message = 'must specify id, question and answer';
          alert(message);
          throw message;
        }
        var method = 'PUT';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards/' + id;

        var data = {question: question, answer: answer};

        return simplePromise(method, url, data);
      }

      function removeFlashcard(id) {
        if(angular.isUndefined(id) ) {
          var message = 'must specify id';
          alert(message);
          throw message;
        }
        var method = 'DELETE';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards/' + id;
        var data = {};

        return simplePromise(method, url, data);
      }

      function changeName(new_name) {
        if(angular.isUndefined(new_name) ) {
          var message = 'must specify new_name';
          alert(message);
          throw message;
        }
        var method = 'PUT';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id;
        var data = {name: new_name, isPublic: true};
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
