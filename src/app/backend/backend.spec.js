(function() {
  'use strict';
  describe('backend service testing', function() {

    var BackendService;

    var mockFlashcards = [
      {id: '1', question: 'q', answer: 'a'},
      {id: '2', question: 'Q', answer: 'A'}
    ];

    beforeEach(module('backend'));
    beforeEach(inject(function(_BackendService_) {
      BackendService = _BackendService_;
    }));

    it('can create a deck locally', function() {
      var deck = new BackendService.Deck();
      deck.name = 'test';
      expect(deck.name).toEqual('test');
    });

    it('can download flashcards', inject(function($httpBackend) {
      var deck = new BackendService.Deck();
      deck.id = '1';
      var $scope = {};

      deck.getFlashcards()
      .then(
        function success(data) {
          $scope.response = data;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('GET')
      .respond(200, mockFlashcards);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response).toEqual(mockFlashcards);
    }));

    it('can create a flashcard', inject(function($httpBackend) {
      var deck = new BackendService.Deck();
      var $scope = {};

      deck.createFlashcard('question', 'answer')
      .then(
        function success(data) {
          $scope.response = data;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('POST')
      .respond(201, mockFlashcards[0]);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response).toEqual(mockFlashcards[0]);
    }));

    it('can update a flashcard', inject(function($httpBackend) {
      var deck = new BackendService.Deck();
      var $scope = {};

      deck.updateFlashcard(1, 'question', 'answer')
      .then(
        function success(data) {
          $scope.response = data;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('PUT')
      .respond(200, mockFlashcards[0]);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response).toEqual(mockFlashcards[0]);
    }));

    it('can remove a flashcard', inject(function($httpBackend) {
      var deck = new BackendService.Deck();
      var $scope = {};
      var mockId = '1';

      deck.removeFlashcard(mockId)
      .then(
        function success(data) {
          $scope.result = data;
          $scope.valid = true;
        },
        function error(data) {
          $scope.result = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('DELETE')
      .respond(200);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
    }));

    it('can change a deck name', inject(function($httpBackend) {
      var deck = new BackendService.Deck();
      deck.name = 'mock';
      var $scope = {};
      var updatedDeck = {
        id: '1',
        name: 'new name'
      };

      deck.changeName('new name')
      .then(
        function success(data) {
          $scope.response = data;
        },
        function error(data) {
          $scope.response = data;
        }
      );

      $httpBackend
      .when('PUT')
      .respond(200, updatedDeck);

      $httpBackend.flush();

      expect($scope.response.name).toEqual('new name');
    }));

    it('can create new deck with api', inject(function($httpBackend) {
      var mockDeck = new BackendService.Deck();
      mockDeck.id = '1';
      mockDeck.name = 'A';
      var $scope = {};

      BackendService.createNewDeck('A')
      .then(
        function success(deck) {
          $scope.response = deck;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('POST')
      .respond(201, mockDeck);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect($scope.response.name).toBe(mockDeck.name);
    }));

    it('can fetch all decks', inject(function($httpBackend) {
      var mockDeck1 = new BackendService.Deck();
      mockDeck1.name = 'A';
      mockDeck1.id = '1';
      var mockDeck2 = new BackendService.Deck();
      mockDeck2.name = 'B';
      mockDeck2.id = '2';
      var mockDecks = [mockDeck1, mockDeck2];
      var $scope = {};

      BackendService.getDecks()
      .then(
        function success(decks) {
          $scope.response = decks;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('GET')
      .respond(200, mockDecks);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect(typeof($scope.response[0])).toEqual(typeof(mockDecks[0]));
    }));

    it('can fetch a deck by id', inject(function($httpBackend) {
      var mockDeck = new BackendService.Deck();
      mockDeck.id = '1';
      mockDeck.name = 'test';
      var $scope = {};

      BackendService.getDeckById('1')
      .then(
        function success(deck) {
          $scope.response = deck;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('GET')
      .respond(200, mockDeck);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect(typeof($scope.response)).toEqual(typeof(mockDeck));
    }));

    it('can fetch a deck by name', inject(function($httpBackend) {
      var mockDeck = new BackendService.Deck();
      mockDeck.id = '1';
      mockDeck.name = 'test';
      var $scope = {};

      BackendService.getDeckByName('test')
      .then(
        function success(deck) {
          $scope.response = deck;
          $scope.valid = true;
        },
        function error(data) {
          $scope.response = data;
          $scope.valid = false;
        }
      );

      $httpBackend
      .when('GET')
      .respond(200, mockDeck);

      $httpBackend.flush();

      expect($scope.valid).toBe(true);
      expect(typeof($scope.response)).toEqual(typeof(mockDeck));
    }));
  });
})();
