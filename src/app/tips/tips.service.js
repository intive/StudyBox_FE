/**
 * INSTRUKCJA OBSŁUGI
 *
 *  createNewTip(deckId,flashCardId,content) - tworzy nową podpowiedź w decku o podanym ID, dla karty o podanym ID o danej treści
 *
 *  Tip [klasa]:
 *  > pola:
 *  id - identyfikator podpowiedzi, ustalany przez serwer
 *  content - tekst podpowiedzi
 */

(function() {
  'use strict';
  angular
    .module('tips')
    .service('TipsService', TipsService);

  /** @ngInject */
  function TipsService($http, $q) {

    function show_error(message) {
      alert(message);
      throw message;
    }

    function Tip()
    {
      this.id = null;
      this.content = null;
    }

    function createNewTip(deckId,flashCardId,content)
    {
      if(angular.isUndefined(deckId) ) show_error('Must specify deck id');
      if(angular.isUndefined(flashCardId) ) show_error('Must specify flash card id');
      if(angular.isUndefined(content) ) show_error('Must specify content of tip');

      var method = 'POST';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashCardId+'/tips';
      var data = {prompt: content};

      return $http({method: method, url: url, data: data})
        .then(
        function success(response) {
          var tip = new Tip();
          tip.id = response.data.id;
          tip.content = response.data.prompt;
          return tip;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );

    }

  }

})();
