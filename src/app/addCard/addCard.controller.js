(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $state, $document, BackendService, $scope, $log) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;
    vm.decks = null;
    vm.load = false;

    if (vm.cardId) {
      if ($scope.selectedCard) {
        vm.question = $scope.selectedCard.question;
        vm.answer = $scope.selectedCard.answer;
        vm.editMode = true
      }
    }
    vm.toggleStatus = false;

    vm.toggleButton = function () {
      if (vm.toggleStatus === false)
        angular.element($document[0].querySelector('#hint')).css("display", "block");
      else
        angular.element($document[0].querySelector('#hint')).css("display", "none");

      vm.toggleStatus = !vm.toggleStatus;
    };

    vm.submitCard = function (isValid) {
      //alert('deckName: '+vm.deckName+'\n'+'deckId: ('+$stateParams.deckId+')\n'+'cardId: '+$stateParams.cardId+'\n'+'vm.question: '+vm.question+'\n'+'vm.answer: '+vm.answer);
      //gdy formularz nie przechodzi walidacji
      if (isValid) {
        if (!$scope.searchText) {
          return $scope.setEmptyNameError(true)
        }
        if (!$scope.selectedDeck) {
          $log.warn("zmieniono nazwe talii");
          return alert('zmieniono nazwe talii, not yet implemented');
        }
        //alert('deckName: '+vm.deckName+'\n'+'deckId: ('+$stateParams.deckId+')\n'+'cardId: '+$stateParams.cardId+'\n'+'$scope.question: '+$scope.question+'\n'+'$scope.answer: '+$scope.answer);
        //Jeżeli pola nie są puste
        if (angular.isDefined(vm.question) && angular.isDefined(vm.answer)) {
          if ($stateParams.cardId) {
            //Edycja
            BackendService.getDeckById($stateParams.deckId)
              .then(function success(data) {
                vm.newDeck = data;
                console.log($scope.selectedDeck)
                vm.newDeck.updateFlashcard(vm.cardId, vm.question, vm.answer)
                  .then(function success() {
                    //alert("Zedytowano fiszkę");
                    $state.go("deck", {deckId: vm.newDeck.id});
                    $state.reload()
                  },
                  function error() {
                    var message = 'I cant update a flash card';
                    alert(message);
                    throw message;
                  });
              },
              function error() {
                var message = 'I cant create new deck';
                alert(message);
                throw message;
              });
          }
          else {
            if ($stateParams.deckId) {
              //alert('im here');
              BackendService.getDeckById($stateParams.deckId)
                .then(function success(data) {
                  vm.newDeck = data;

                  vm.newDeck.createFlashcard(vm.question, vm.answer)
                    .then(function success() {
                      //alert("Dodano nową fiszkę do aktualnej talii");
                      $state.go("deck.addCard", {deckId: vm.newDeck.id});
                      $state.reload("deck");
                    },
                    function error() {
                      var message = 'I cant create a flash card';
                      alert(message);
                      throw message;
                    });
                },
                function error() {
                  var message = 'I cant create new deck';
                  alert(message);
                  throw message;
                });
            }
            else {
              BackendService.createNewDeck($scope.selectedDeck.name)
                .then(function success(data) {
                  vm.newDeck = data;

                  vm.newDeck.createFlashcard(vm.question, vm.answer)
                    .then(function success() {
                      //alert("Dodano nową fiszkę do nowej talii");
                      $state.go("deck.addCard", {deckId: vm.newDeck.id});
                    },
                    function error() {
                      var message = 'I cant create a flash card';
                      alert(message);
                      throw message;
                    });
                },
                function error() {
                  var message = 'I cant create new deck';
                  alert(message);
                  throw message;
                });
            }
          }
        }

      }
    }
  }
})();
