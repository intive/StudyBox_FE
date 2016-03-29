(function () {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckObj;
    var cardObj;
    return {
      setDeckObj: setDeckObj,
      getDeckObj: getDeckObj,
      setCardObj: setCardObj,
      getCardObj: getCardObj
    };

    function setDeckObj(deck) {
      deckObj = deck
    }
    function getDeckObj() {
      return deckObj
    }
    function setCardObj(obj) {
      cardObj = obj
    }
    function getCardObj() {
      return cardObj
    }
  }
})();
