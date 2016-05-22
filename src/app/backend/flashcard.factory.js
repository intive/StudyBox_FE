(function() {
  'use strict';
  angular
    .module('new_backend')
    .factory('FlashcardFactory', FlashcardFactory);

  /** @ngInject */
  function FlashcardFactory($http, $q, TipFactory) {

    function Flashcard() {
      // fields
      this.id = null;
      this.question = null;
      this.answer = null;
      this.isHidden = null;
      this.tips = [];
      this.deckId = null;

      // methods
      this.getTips = getTips;
      this.addNewTip = addNewTip;
      this.changeQuestion = changeQuestion;
      this.changeAnswer = changeAnswer;
      this.changeVisibility = changeVisibility;
      this.remove = remove;

      var Tip = TipFactory.Tip;

      function getTips() {
          var method = 'GET';
          var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id + '/tips';
          var data = {};

          return promiseWithTips(method, url, data);
      }

      function promiseWithTips(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            this.tips = jsonToTips(response.data);
            return this.tips;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function jsonToTips(data) {
        var tips = [];
        for(var i = 0; i < data.length; i++) {
          var tip = jsonToTip(data[i]);
          tips.push(tip);
        }
        return tips;
      }

      function jsonToTip(data) {
        var tip = new Tip();
        tip.deckId = this.deckId;
        tip.flashcardId = this.id;
        tip.id = data.id;
        tip.essence = data.essence;
        tip.difficult = data.difficult;

        return tip;
      }


      function addNewTip(essence, difficult) {
        if(!essence)
          throw_error('must specify essence');
        if(!difficult)
          throw_error('must specify difficulty');

        var method = 'POST';
        var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id + '/tips';
        var data = {essence: essence, difficult: difficult};

        return promiseAddNewTip(method, url, data);
      }

      function promiseAddNewTip(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            var tip = jsonToTip(response.data);
            this.tips.push(tip);
            return tip;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function changeQuestion(new_question) {

        if(!new_question) throw_error('Must specify new question');

        var method = 'PUT';
        var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id;
        var data = {question: new_question, answer: this.answer, isHidden: this.isHidden};

        return simplePromise(method, url, data);
      }

      function changeAnswer(new_answer) {

        if(!new_answer) throw_error('Must specify new answer');

        var method = 'PUT';
        var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id;
        var data = {question: this.question, answer: new_answer, isHidden: this.isHidden};

        return simplePromise(method, url, data);
      }

      function changeVisibility(new_visibility) {

        if(!new_visibility) throw_error('Must specify new visibility');

        var method = 'PUT';
        var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id;
        var data = {question: this.question, answer: this.answer, isHidden: new_visibility};

        return simplePromise(method, url, data);
      }

      function remove() {
        var method = 'DELETE';
        var url = '/api/decks/' + this.deckId + '/flashcards/' + this.id;
        var data = {};

        return simplePromise(method, url, data);
      }

      function simplePromise(method, url, data) {
        var promise = $http({method: method, url: url, data: data})
        .then(
          function success(response) {
            return response.data;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
        return promise;
      }

      function throw_error(message) {
        alert(message);
        throw message;
      }

    }

    return {Flashcard: Flashcard};
  }
})();
