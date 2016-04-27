/**
 * INSTRUKCJA OBSŁUGI
 *
 *  createNewTip(deckId,flashCardId,content) - tworzy nową podpowiedź w decku o podanym ID, dla karty o podanym ID o danej treści. Zwraca obiekt Tip z jego id i contentem.
 *  getTipById(deckId,flashcardId,tipId) - pobiera nam dane podpowiedzi z wybranego decka i karty po jej ID. Zwraca obiekt Tip z jego id i contentem.
 *  getAllTips(deckId,flashcardId) - pobiera wszystkie podpowiedzi z danego decka, z danej karty. Zwraca tablicę obiektów typu Tip.
 *  updateTip(deckId,flashcardId,tipId,content) - zamienia treść podpowiedzi o danym ID, która znajduje się w danym decku i wybranej karcie na content. Zwraca obiekt Tip z jego id i aktualnym contentem.
 *  deleteTip(deckId,flashcardId,tipId) - usuwa wybraną podpowiedź, która nazjduje się w podanej tali i należy do podanej karty.
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

    function throw_error(message) {
      alert(message);
      throw message;
    }

    function Tip()
    {
      this.id = null;
      this.content = null;
    }

    this.createNewTip = createNewTip;
    this.getTipById = getTipById;
    this.getAllTips = getAllTips;
    this.updateTip = updateTip;
    this.deleteTip = deleteTip;

    function createNewTip(deckId,flashcardId,content)
    {
      if(angular.isUndefined(deckId) ) throw_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) throw_error('Must specify flash card id');
      if(angular.isUndefined(content) ) throw_error('Must specify content of tip');

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

      if(angular.isUndefined(deckId) ) throw_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) throw_error('Must specify flash card id');
      if(angular.isUndefined(tipId) ) throw_error('Must specify content of tip id');

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

    function getAllTips(deckId,flashcardId)
    {
      if(angular.isUndefined(deckId) ) throw_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) throw_error('Must specify flash card id');

      var method = 'GET';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashcardId+'/tips';

      return $http({method: method, url: url})
        .then(
        function success(response) {
          var tips = [];
          for(var i = 0; i < response.data.length; i++) {
            var tip = new Tip();
            tip.id = response.data[i].id;
            tip.content = response.data[i].prompt;
            tips.push(tip);
          }
          return tips;
        },
        function error(response) {
          return $q.reject(response.data);
        }
      );
    }

    function updateTip(deckId,flashcardId,tipId,content)
    {
      if(angular.isUndefined(deckId) ) throw_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) throw_error('Must specify flash card id');
      if(angular.isUndefined(tipId) ) throw_error('Must specify tip id');
      if(angular.isUndefined(content) ) throw_error('Must specify content of tip');

      var method = 'PUT';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashcardId+'/tips/'+tipId;
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

    function deleteTip(deckId,flashcardId,tipId)
    {
      if(angular.isUndefined(deckId) ) throw_error('Must specify deck id');
      if(angular.isUndefined(flashcardId) ) throw_error('Must specify flash card id');
      if(angular.isUndefined(tipId) ) throw_error('Must specify tip id');

      var method = 'DELETE';
      var url = '/api/decks/'+deckId+'/flashcards/'+flashcardId+'/tips/'+tipId;

      return $http({method: method, url: url})
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
