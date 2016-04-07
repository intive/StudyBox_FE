(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, BackendService, $log, DeckService, $mdDialog, $translate, $rootScope) {
    var vm = this;
    vm.selectedDeck = new BackendService.Deck();
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectedDeckChange = selectedDeckChange;
    vm.changeDeckData = changeDeckData;
    vm.textChange = textChange;
    vm.createDeck = createDeck;
    vm.selectDeck = selectDeck;
    vm.selectCard = selectCard;
    vm.removeCard = removeCard;
    vm.lostNetworkConnection = lostNetworkConnection;
    vm.clear = clear;
    vm.emptyNameError = DeckService.getEmptyNameError();


    vm.access = $stateParams.access;

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

    function textChange(text) {
      DeckService.setNewDeck({name:text, access:vm.deckAccess})
    }

    function selectedDeckChange(deck) {
      if(deck === true){
        return changeDeckData();
      }
      if (deck) {
        if (deck.id){
          selectDeck(deck);
        } else {
          deck.access = vm.deckAccess;
          createDeck(deck);
        }
      }
    }

    function createDeck(deck) {
      DeckService.setDeckObj(deck);
      if($stateParams.deckId){
        $stateParams.deckId = null;
        $stateParams.cardId = null;
        initDeck(null);
      }
    }

    function selectDeck(deck) {
      DeckService.setDeckObj(deck);
      if (deck.id != $stateParams.deckId){
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        initDeck(deck.id);
      }
    }

    function changeDeckData() {
      if (!vm.selectedDeck){
        DeckService.setNewDeck({name: vm.searchText, access: vm.deckAccess});
      } else {
        vm.selectedDeck.updateDeck(vm.searchText, vm.deckAccess)
          .then(function success() {
            $state.go("deck.addCard", {deckId: vm.selectedDeck.id});
            $state.reload("deck");
          },
          function error() {
            var message = 'I cant update Deck name';
            alert(message);
            throw message;
          })
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      //for selecting on ui (ng-repeat)
      if(card.id !=vm.selectedCardId) {
        vm.selectedCardId = card.id;
        $state.go("deck.addCard", {cardId: card.id}, {notify:true});
      } else {
        vm.selectedCardId = false;
        $state.go("deck.addCard", {cardId: null}, {notify:true});
      }
    }

    function removeCard(cardId){
      deleteCardDialog(cardId, vm.cards.length );
    }

    //LOCAL FUNCTIONS
    function queryFilter(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(deck) {
        if(deck.name){
          return (deck.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        }
      };
    }

    function clear() {
      vm.searchText = null;
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
            DeckService.setNewDeck({name: vm.selectedDeck.name, access: vm.deckAccess});
            getCards();
          }, function (e) {
            $log.error(e);
          });
      } else {
        vm.selectedDeck = DeckService.getDeckObj();
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
        vm.cards=[];
      }
      //clean card field
      if (!$stateParams.deckId){
        vm.selectedDeck = DeckService.setDeckObj(null);
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
      }
      $stateParams.cardId = null;
      if($state.$current == 'deck.addCard'){
        $state.reload('deck.addCard');
      }
    }
    initDeck($stateParams.deckId);

    function lostNetworkConnection(){
      $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(false)
            .title($translate.instant('networkAlert-WARNING'))
            .textContent($translate.instant('deck-OFFLINE_REMOVE_CARD_MODAL'))
            .ariaLabel('Alert Dialog')
            .ok($translate.instant('networkAlert-AGREE'))
      );
    }

    //DELETE CARD DIALOG
    function deleteCardDialog(cardId, cardNo) {
      var content = $translate.instant("deck-REMOVE_CARD_MODAL");
      //info for last card
      if (cardNo < 2) {
        content = ($translate.instant("deck-REMOVE_LAST_CARD_MODAL"));
      }
      var confirm = $mdDialog.confirm()
        .title($translate.instant("deck-REMOVE_CARD"))
        .textContent(content)
        .ok($translate.instant("deck-REMOVE_CARD"))
        .cancel($translate.instant("deck-NO"));
        $mdDialog.show(confirm)
          .then(function () {
            //if connection lost
            if(!$rootScope.networkStatusOnline){
            lostNetworkConnection();
            } else {
              //delete card
              vm.selectedDeck.removeFlashcard(cardId)
                .then(function (result) {
                  //delete deck if last card
                  if (cardNo < 2) {
                    $log.warn('last one flashcard');
                    vm.selectedDeck.remove().then(function () {
                      $state.go('decks');
                    });
                  } else {
                    $state.go("deck.addCard", {deckId: vm.selectedDeck.id, cardId: null});
                    getCards();
                    $log.log(result);
                  }
                }, function (e) {
                  $log.error(e);
                });
            }
          }
          , function () {
            $log.log('do nothing')
          }
        )
    }
  }
})();
