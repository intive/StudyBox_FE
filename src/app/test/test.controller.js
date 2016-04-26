(function() {
  'use strict';

  angular
    .module('test')
    .controller('TestController', TestController);

  /** @ngInject */
  function TestController(BackendService, TipsService, $log, $stateParams,
                          $mdDialog, $state, $translate) {
    var vm = this;
    vm.mode = 'question';
    vm.answer = answer;
    vm.getTips = getTips;
    vm.currentQuestion = 0;
    vm.currentTip = 0;
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
        var retest = $translate.instant('test-BEAT');
        if (vm.yes == vm.cards.length){
          retest = $translate.instant('test-RETEST');
        }

        vm.showDialog(vm.yes, vm.cards.length);
      }
    }

    vm.showDialog = function(correct, all) {
      var allCorrect = false;
      if(correct == all)
        allCorrect = true;

      var wrong = all - correct;

      $mdDialog.show({
        bindToController: true,
        locals: {allCorrect: allCorrect},
        onComplete: function() {
          vm.paintPieChart(correct, wrong);
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

    vm.paintPieChart = function(correct, wrong) {
      var canvas = document.getElementById("dialog-chart");
      var ctx = canvas.getContext("2d");
      var lastend = 0;
      var data = [wrong, correct];
      var myTotal = 0;
      var red = '#C24642';
      var green = '#369EAD';
      var myColor = [red, green];

      for(var e = 0; e < data.length; e++) {
        myTotal += data[e];
      }

      for (var i = 0; i < data.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,canvas.height/2);
        ctx.arc(canvas.width/2,canvas.height/2,canvas.height/2,
                lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
        ctx.lineTo(canvas.width/2,canvas.height/2);
        ctx.fill();
        lastend += Math.PI*2*(data[i]/myTotal);
      }

      var font_px = 30;
      ctx.font = font_px + "px Arial";
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      var all = correct + wrong;
      ctx.fillText(correct+"/"+all, canvas.width/2, canvas.height/2 + font_px/3);
    };

  }

})();
