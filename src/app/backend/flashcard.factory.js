(function() {
  'use strict';
  angular
    .module('backend')
    .factory('FlashcardFactory', FlashcardFactory);

  /** @ngInject */
  function FlashcardFactory(TipFactory) {

    function Flashcard() {
      // fields
      this.id = null;
      this.question = null;
      this.answer = null;
      this.isHidden = null;
      this.tips = [];

      // methods
      this.getTips = getTips;
      this.addNewTip = addNewTip;
      this.changeQuestion = changeQuestion;
      this.changeAnswer = changeAnswer;
      this.changeVisibility = changeVisibility;
      this.remove = remove;

      function getTips() {}
      function addNewTip(prompt) {}
      function changeQuestion(new_question) {}
      function changeAnswer(new_answer) {}
      function changeVisibility(new_visibility) {}
      function remove() {}
    }

    return {Flashcard: Flashcard};
  }
})();
