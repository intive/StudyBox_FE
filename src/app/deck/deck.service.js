(function () {
  'use strict';

  angular
    .module('deck')
    .service('DeckService', DeckService);

  /** @ngInject */
  function DeckService() {
    var deckObj;
    var cardObj;
    var newDeck = {name:null, isPrivate:true};
    var error;
    return {
      setDeckObj: setDeckObj,
      getDeckObj: getDeckObj,
      setCardObj: setCardObj,
      getCardObj: getCardObj,
      setNewDeck: setNewDeck,
      getNewDeck: getNewDeck,
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
    function setNewDeck(deck) {
      newDeck = deck
    }
    function getNewDeck() {
      return newDeck
    }
    function setEmptyNameError(bool) {
      error = bool;
    }
    function getEmptyNameError() {
      return error
    }
  }
})();
