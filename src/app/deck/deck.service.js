(function () {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckName;
    var deckObj;
    return {
      setDeckName: setDeckName,
      getDeckName: getDeckName,
      setDeckObj: setDeckObj,
      getDeckObj: getDeckObj
    };

    function setDeckName(name) {
      deckName = name
    }
    function getDeckName() {
      return deckName
    }
    function setDeckObj(obj) {
      deckObj = obj
    }
    function getDeckObj() {
      return deckObj
    }
  }
})();
