(function() {
  'use strict';
  describe('new_backend service testing', function() {

    beforeEach(module('new_backend'));

    it('can create a deck locally', inject(function(DeckFactory) {
      var deck = new DeckFactory.Deck();
      deck.name = 'test';
      expect(deck.name).toEqual('test');
    }));

    it('can create a flashcard locally', inject(function(FlashcardFactory) {
      var flashcard = new FlashcardFactory.Flashcard();
      flashcard.question = 'test';
      expect(flashcard.question).toEqual('test');
    }));

    it('can create a tip locally', inject(function(TipFactory) {
      var tip = new TipFactory.Tip();
      tip.prompt = 'test';
      expect(tip.prompt).toEqual('test');
    }));

  });
})();
