(function () {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckObj;
    var cardObj;
    var newDeckName;
    var error;
    return {
      setDeckObj: setDeckObj,
      getDeckObj: getDeckObj,
      setCardObj: setCardObj,
      getCardObj: getCardObj,
      setNewDeckName: setNewDeckName,
      getNewDeckName: getNewDeckName,
      setEmptyNameError: setEmptyNameError,
      getEmptyNameError: getEmptyNameError
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
    function setNewDeckName(name) {
      newDeckName = name
    }
    function getNewDeckName() {
      return newDeckName
    }
    function setEmptyNameError(bool) {
      error = bool;
    }
    function getEmptyNameError() {
      return error
    }
  }
})();
