(function() {
  'use strict';
  angular
    .module('new_backend')
    .factory('DeckFactory', DeckFactory);

  /** @ngInject */
  function DeckFactory($http, $q, FlashcardFactory) {

    function Deck() {
      // fields
      this.id = null;
      this.name = null;
      this.isPublic = null;
      this.flashcardsCount = null;
      this.creatorEmail = null;
      this.creationDate = null;
      this.flashcards = [];

      // methods
      this.getFlashcards = getFlashcards;
      this.addNewFlashcard = addNewFlashcard;
      this.rename = rename;
      this.changeAccess = changeAccess;
      this.remove = remove;

      /* *** */

      var Flashcard = FlashcardFactory.Flashcard;

      function getFlashcards() {
        var method = 'GET';
          /*jshint validthis:true */
          var url = "/api/decks/" + this.id + "/flashcards";
          var data = {};

          return promiseWithFlashcards(method, url, data);
      }

      function promiseWithFlashcards(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            this.flashcards = jsonToFlashcards(response.data);
            return this.flashcards;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function jsonToFlashcards(data) {
        var flashcards = [];
        for(var i = 0; i < data.length; i++) {
          var flashcard = jsonToFlashcard(data[i]);
          flashcards.push(flashcard);
        }
        return flashcards;
      }

      function jsonToFlashcard(data) {
        var flashcard = new Flashcard();
        flashcard.id = data.id;
        /*jshint validthis:true */
        flashcard.deckId = this.id;
        flashcard.question = data.question;
        flashcard.answer = data.answer;
        try {
          flashcard.isHidden = data.isHidden;
        } catch(error) {
          flashcard.isHidden = false;
        }
        return flashcard;
      }

      function addNewFlashcard(question, answer, isHidden) {
        if(!question)
          throw_error('must specify question');
        if(!answer)
          throw_error('must specify answer');
        if(!isHidden)
          isHidden = false;

        var method = 'POST';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id + '/flashcards';
        var data = {question: question, answer: answer, isHidden: isHidden};

        return promiseAddNewFlashcard(method, url, data);
      }

      function throw_error(message) {
        alert(message);
        throw message;
      }

      function promiseAddNewFlashcard(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            var flashcard = jsonToFlashcard(response.data);
            this.flashcards.push(flashcard);
            return flashcard;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function rename(new_name) {
        if(!new_name)
          throw_error('must specify new_name');

        var method = 'PUT';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id;
        var data = {name: new_name, isPublic: this.isPublic};

        return simplePromise(method, url, data);
      }

      function simplePromise(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            return true;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function changeAccess(new_access) {
        if(!new_access)
          throw_error('must specify new_access');

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
        var data = {name: this.name, isPublic: isPublic};

        return simplePromise(method, url, data);
      }

      function remove() {
        var method = 'DELETE';
        /*jshint validthis:true */
        var url = '/api/decks/' + this.id;
        var data = {};

        return simplePromise(method, url, data);
      }
    }

    return {Deck: Deck};
  }
})();
