(function() {
  'use strict';
  angular
    .module('backend')
    .factory('DeckFactory', DeckFactory);

  /** @ngInject */
  function DeckFactory(FlashcardFactory) {

    function Deck() {
      // fields
      this.id = null;
      this.name = null;
      this.isPublic = null;
      this.flashcards = [];

      // methods
      this.getFlashcards = getFlashcards;
      this.rename = rename;
      this.changeAccess = changeAccess;
      this.remove = remove;

      function getFlashcards() {}
      function rename(new_name) {}
      function changeAccess(new_access) {}
      function remove() {}
    }

    return Deck;
  }
})();
