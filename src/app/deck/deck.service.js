(function () {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckName;
    var creation;
    return {
      setDeckName: function (name) {
        deckName = name
      },
      getDeckName: function () {
        return deckName
      }
    }
  }
})();
