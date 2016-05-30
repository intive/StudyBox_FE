(function() {
  'use strict';

  angular
    .module('test')
    .controller('TestController', TestController);

  /** @ngInject */
  function TestController(BackendService, TipsService, $log, $stateParams,
                          $mdDialog, $state) {
    var vm = this;
    vm.mode = 'question';
    vm.answer = answer;
    vm.getCurrentTips = getCurrentTips;
    vm.getPrevTip = getPrevTip;
    vm.getNextTip = getNextTip;
    vm.currentQuestion = 0;
    vm.currentTip = 0;
    vm.usedTips = [];
    vm.yes = 0;
    vm.no = 0;
    vm.getScorePercentage = getScorePercentage;

    BackendService.getDeckById($stateParams.deckId)
      .then(function (result) {
        vm.selectedDeck = result;
         getCards(false);
      }, function (e) {
        $log.error(e);
      });

    function getCards(isHidden) {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards = result.filter(hideFilter(isHidden));
        }, function (e) {
          $log.error(e);
        })
        .then(function () {
          getTips();
        }, function (e) {
          $log.error(e);
        });
    }

    function hideFilter(isHidden) {
      return function filterFn(card) {
        return (card.isHidden === isHidden);
      };
    }

    function getTips() {
      TipsService.getAllTips(vm.selectedDeck.id, vm.cards[vm.currentQuestion].id)
        .then(function (result) {
          if (result.length > 0){
            vm.cards[vm.currentQuestion].tips = result;
          }
        }, function (e) {
          $log.error(e);
        });
    }

    function getCurrentTips() {
      vm.mode = 'hint';
      vm.usedTips[vm.currentQuestion] = 1;
    }

    function getPrevTip(){
      vm.currentTip = vm.currentTip - 1;
    }

    function getNextTip(){
      vm.currentTip = vm.currentTip + 1;
      if (vm.currentTip > vm.usedTips[vm.currentQuestion]){
        vm.usedTips[vm.currentQuestion] = vm.currentTip;
      }
    }

    function answer(answer) {
      if (answer){
        vm.yes +=1;
      } else {
        vm.no +=1;
      }
      vm.result = answer;
      vm.currentTip = 0;
      if (vm.currentQuestion+1 < vm.cards.length){
        vm.currentQuestion +=1;
        vm.mode = 'question';
        vm.result = null;
      } else {
        vm.showDialog(vm.yes, vm.cards.length);
      }
      getTips();
    }

    vm.showDialog = function(correct, all) {
      var allCorrect = (correct == all) ? true : false;

      var wrong = all - correct;

      var total = 0;
      vm.usedTips.forEach(function (question){
        total = total + question;
      });

      $mdDialog.show({
        bindToController: true,
        locals: {
          cardsNum: all,
          correct: correct,
          wrong: wrong,
          allCorrect: allCorrect
        },
        templateUrl: 'app/test/dialog.html',
        controller: TestController,
        controllerAs: 'test'
      });
    };

    vm.closeDialog = function() {
      $state.reload();
    };

    vm.goToPrivateDecks = function() {
      $mdDialog.hide();
      $state.go("decks", {access: 'private'});
    };

    function getScorePercentage() {
      var result = Math.floor(((vm.correct / vm.cardsNum) * 100));
      return result + '%';
    }

  }

})();
