//
// Obserwator, rozsyła talie do subskrybentów.
//
(function() {
  'use strict';

  angular
    .module('decks')
    .service('DecksService', DecksService);

  /* @ngInject */
  function DecksService() {
    this.observers = [];

    this.addObserver = function(observer) {
      this.observers.push(observer);
    };

    this.notifyObservers = function(decks) {
      for(var i = 0; i < this.observers.length; i++)
        this.observers[i].notify(decks);
    };
  }
})();
