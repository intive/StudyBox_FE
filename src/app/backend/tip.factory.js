(function() {
  'use strict';
  angular
    .module('new_backend')
    .factory('TipFactory', TipFactory);

  /** @ngInject */
  function TipFactory() {

    function Tip() {
      // fields
      this.id = null;
      this.essence = null;
      this.deckId = null;
      this.flashcardId = null;

      // methods
      this.update = update;
      this.remove = remove;

      //**//

      function throw_error(message) {
        alert(message);
        throw message;
      }

      function update(new_essence, difficult)
      {
        if(!new_essence) throw_error('Must specify content of tip');

        //chwilowe rozwiązanie
        difficult = 0;

        var method = 'PUT';
        var url = '/api/decks/'+this.deckId+'/flashcards/'+this.flashcardId+'/tips/'+this.id;
        var data = {essence: new_essence, difficult: difficult};

        return $http({method: method, url: url, data: data})
          .then(
          function success(response) {
            this.essence = response.data.essence;
            this.difficult = response.data.difficult;
            this.id = response.data.id;
          },
          function error(response) {
            return $q.reject(response.data);
          }
        );
      }
      function remove()
      {
        var method = 'DELETE';
        var url = '/api/decks/'+this.deckId+'/flashcards/'+this.flashcardId+'/tips/'+this.id;

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

    return {Tip: Tip};
  }
})();
