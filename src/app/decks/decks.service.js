(function() {
  'use strict';

  angular
    .module('decks')
    .service('DecksService', DecksService);

  /* @ngInject */
  function DecksService() {
    this.controller = null;
    this.decks = [];

    this.setDecks = function(decks) {
      this.decks = decks;
      this.controller.onDecksChange(decks);
    };

    this.getDecks = function() {
      return this.decks;
    };
  }
})();
