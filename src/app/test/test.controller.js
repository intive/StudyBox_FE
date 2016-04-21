(function() {
  'use strict';

  angular
    .module('test')
    .controller('TestController', TestController);

  /** @ngInject */
  function TestController(BackendService, $log, $stateParams, $mdDialog, $state, $translate) {
    var vm = this;
    vm.mode = 'question';
    vm.answer = answer;
    vm.current = 0;
    vm.yes = 0;
    vm.no = 0;

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
          vm.cards = result.filter(hideFilter(isHidden))
        }, function (e) {
          $log.error(e);
        });
    }

    function hideFilter(isHidden) {
      return function filterFn(card) {
        return (card.isHidden === isHidden);
      };
    }

    function answer(answer) {
      if (answer){
        vm.yes +=1;
      } else {
        vm.no +=1;
      }
      vm.result = answer;
      if (vm.current+1 < vm.cards.length){
        vm.current +=1;
        vm.mode = 'question';
        vm.result = null;
      } else {

        var confirm = $mdDialog.confirm()
          .title($translate.instant('test-CONGRATS'))
          .textContent($translate.instant('test-SCORE')+vm.yes+'/'+vm.cards.length)
          .ariaLabel('Score')
          .ok($translate.instant('test-RETEST'))
          .cancel($translate.instant('navbar-PRIVATE_CARDS'));
        $mdDialog.show(confirm).then(function() {
          $state.reload();
        }, function() {
          $state.go("decks", {access: 'private'});
        });

      }
    }

  }

})();
