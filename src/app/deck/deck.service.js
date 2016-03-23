(function() {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckName;
    var creation;
    return {
      setDeckName: setDeckName,
      getDeckName: getDeckName,
      setCreation: setCreation,
      getCreation: getCreation
    };

    function setDeckName(name) {
      deckName=name
    }

    function getDeckName() {
      return deckName
    }

    function setCreation(bool) {
      creation=bool
    }

    function getCreation() {
      return creation
    }
  }
})();
