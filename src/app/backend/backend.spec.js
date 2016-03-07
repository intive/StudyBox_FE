(function() {
    'use strict';
    describe('backend service testing', function() {
        var BackendService;
        var mockCard = {
            id: '1',
            question: 'test question',
            answer: 'test answer'
        };

        beforeEach(module('backend'));
        beforeEach(inject(function(_BackendService_) {
            BackendService = _BackendService_;
        }));

        it('can create a deck locally', function() {
            var deck = new BackendService.Deck('sample name');
            expect(deck.name).toEqual('sample name');
        });

        it('returns a promise for every api method', inject(function($q) {
            var deferred = $q.defer();
            var deck = new BackendService.Deck();

            var creationPromise = deck.createFlashcard(mockCard);
            expect(typeof(deferred.promise) == typeof(creationPromise)).toEqual(true);

            var updatePromise = deck.updateFlashcard(mockCard);
            expect(typeof(deferred.promise) == typeof(updatePromise)).toEqual(true);

            var removePromise = deck.removeFlashcard('1');
            expect(typeof(deferred.promise) == typeof(removePromise)).toEqual(true);

            var nameChangePromise = deck.changeName('new name');
            expect(typeof(deferred.promise) == typeof(nameChangePromise)).toEqual(true);
        }));

        it('can create a flashcard', inject(function($httpBackend) {
            var deck = new BackendService.Deck();
            var $scope = {};

            deck.createFlashcard(mockCard)
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
            .when('PUT', 'http://localhost/fake')
            .respond(201, mockCard);

            $httpBackend.flush();

            expect($scope.valid).toBe(true);
            expect($scope.response).toEqual(mockCard);
        }));

        it('can update a flashcard', inject(function($httpBackend) {
            var deck = new BackendService.Deck();
            var $scope = {};

            deck.updateFlashcard(mockCard)
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
            .when('PUT', 'http://localhost/fake')
            .respond(200, mockCard);

            $httpBackend.flush();

            expect($scope.valid).toBe(true);
            expect($scope.response).toEqual(mockCard);
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
            .when('DELETE', 'http://localhost/fake')
            .respond(200);

            $httpBackend.flush();

            expect($scope.valid).toBe(true);
        }));

        it('can change a deck name', inject(function($httpBackend) {
            var deck = new BackendService.Deck();
            var $scope = {};
            var updatedDeck = {
                id: '1',
                name: 'new name'
            };

            deck.changeName('new name')
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
            .when('PUT', 'http://localhost/fake')
            .respond(200, updatedDeck);

            $httpBackend.flush();

            expect($scope.valid).toBe(true);
            expect($scope.response).toEqual(updatedDeck);
        }));
    });
})();
