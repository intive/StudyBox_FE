(function() {
  'use strict';
  angular
    .module('backend')
    .factory('TipFactory', TipFactory);

  /** @ngInject */
  function TipFactory() {

    function Tip() {
      // fields
      this.id = null;
      this.prompt = null;
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

      function update(new_prompt)
      {
        if(!new_prompt) throw_error('Must specify content of tip');

        var method = 'PUT';
        var url = '/api/decks/'+this.deckId+'/flashcards/'+this.flashcardId+'/tips/'+this.id;
        var data = {prompt: new_prompt};

        return $http({method: method, url: url, data: data})
          .then(
          function success(response) {
            this.prompt = response.data.prompt;
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
