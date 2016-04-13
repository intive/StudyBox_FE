/**
 * INSTRUKCJA OBSŁUGI
 *
 *  createNewTip(deckId,flashCardId,content) - tworzy nową podpowiedź w decku o podanym ID, dla karty o podanym ID o danej treści. Zwraca obiekt Tip z jego id i contentem.
 *  getTipById(deckId,flashcardId,tipId) - pobiera nam dane podpowiedzi z wybranego decka i karty po jej ID. Zwraca obiekt Tip z jego id i contentem.
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

    function createNewTip(deckId,flashcardId,content)
    {
      if(angular.isUndefined(deckId) ) show_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) show_error('Must specify flash card id');
      if(angular.isUndefined(content) ) show_error('Must specify content of tip');

      var method = 'POST';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashcardId+'/tips';
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

    function getTipById(deckId,flashcardId,tipId)
    {

      if(angular.isUndefined(deckId) ) show_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) show_error('Must specify flash card id');
      if(angular.isUndefined(tipId) ) show_error('Must specify content of tip id');

      var method = 'GET';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashcardId+'/tips/'+tipId;

      return $http({method: method, url: url})
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
