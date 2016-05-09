(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckPreviewController', DeckPreviewController);

  /** @ngInject */
  function DeckPreviewController($stateParams, $state, BackendService, $log, DeckService, $mdDialog, $mdMedia, $document, $scope, $translate, TipsService) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.selectedDeck = new BackendService.Deck();
    vm.selectCard = selectCard;
    vm.clear = clear;
    vm.getDecks = getDecks;
    vm.selectDeck = selectDeck;
    vm.hintsListDialog = hintsListDialog;
    vm.cancelDialog = cancelDialog;
    vm.checkIfAllHidden = checkIfAllHidden;
    vm.access = $stateParams.access;
    vm.getAllTips = getAllTips;

    function checkIfAllHidden(){
      vm.visibleCards = vm.cards.filter(hideFilter(false));

      if(vm.visibleCards.length == 0){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element($document[0].querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title($translate.instant('deck-ALL_HIDDEN_TITLE'))
            .textContent($translate.instant('deck-ALL_HIDDEN_TEXT_CONTENT'))
            .ariaLabel('All are hidden')
            .ok($translate.instant('deck-ALL_HIDDEN_OK'))
        );
      }
      else{
        $state.go('test', { deckId: vm.deckId})
      }

    }

    function hideFilter(isHidden) {
      return function filterFn(card) {
        return (card.isHidden === isHidden);
      };
    }

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load) {
        if (!vm.decks) {
          //create request for deck list
          vm.decks = BackendService.getDecks(vm.access);
        }
        return vm.decks
          .then(function (result) {
            var list = query ? result.filter(queryFilter(query)) : result;
            if (query){
              list.unshift({name:query});
            }
            return list;
          });
      } else {
        vm.load = true;
      }
    }

    function getAllTips(cardId){
      TipsService.getAllTips(vm.deckId, cardId)
      .then(function success(data) {
        vm.hints = data;
      },
      function error(){
        throw 'Nie można pobrać podpowiedzi';
      });
    }

    function selectDeck(deck) {
      if (!deck) return;
      if (deck.id && deck.id != $stateParams.deckId) {
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        $state.go($state.current, {deckId: deck.id}, {notify: false});
        initDeck(deck.id);
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      //for selecting on ui (ng-repeat)
      if(card.id !=vm.selectedCardId) {
        pickUpCard(card.id);
        $state.go($state.current, {cardId: card.id}, {notify:true});
      } else {
        pickUpCard(false);
        $state.go($state.current, {cardId: null}, {notify:true});
      }
    }

    function pickUpCard(cardId) {
      vm.selectedCardId = cardId;
    }

    //LOCAL FUNCTIONS
    function clear() {
      vm.searchText = null;
    }

    function queryFilter(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        if(deck.name){
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        }
      };
    }

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (result) {
          vm.cards = result;
        }, function (e) {
          $log.error(e);
        });
    }

    //init current deck
    function initDeck(value) {
      if(value){
        BackendService.getDeckById(value)
          .then(function (result) {
            vm.selectedDeck = result;
            vm.selectedItem = vm.selectedDeck;
            if (result.isPublic){
              vm.deckAccess = 'public';
            } else {
              vm.deckAccess = 'private';
            }
            vm.searchText = vm.selectDeck.name;
            DeckService.setNewDeck({name: vm.selectedDeck.name, access: vm.deckAccess});
            getCards();
            vm.dataChanged = false;
          }, function (e) {
            $log.error(e);
          });
      } else {
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
        vm.dataChanged = false;
      }
      pickUpCard($stateParams.cardId);
    }
    initDeck($stateParams.deckId);

  function hintsListDialog(ev, card) {
    getAllTips(card.id);
    vm.hintCardQuestion = card.question;
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: DeckPreviewController,
      templateUrl: 'app/deck/hintsList.html',
      parent: angular.element($document.body),
      targetEvent: ev,
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
  }

  function cancelDialog(){
    $mdDialog.hide();
  }

}
})();
