(function() {
  'use strict';

  angular
    .module('test')
    .controller('TestController', TestController);

  /** @ngInject */
  function TestController(BackendService, $log, $stateParams) {
    var vm = this;
    vm.mode = 'question';
    vm.answer = answer;
    vm.current = 0;
    vm.yes = 0;
    vm.no = 0;

    BackendService.getDeckById($stateParams.deckId)
      .then(function (result) {
        vm.selectedDeck = result;
        getCards();
      }, function (e) {
        $log.error(e);
      });

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards = result;
        }, function (e) {
          $log.error(e);
        });
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
      } else {
        $log.log('finish');
        $log.log(vm.yes);
        $log.log(vm.no);
        $log.log(vm.mode);
      }
    }

  }

})();
