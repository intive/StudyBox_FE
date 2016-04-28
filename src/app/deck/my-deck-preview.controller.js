(function () {
  'use strict';

  angular
    .module('deck')
    .controller('MyDeckPreviewController', MyDeckPreviewController);

  /** @ngInject */
  function MyDeckPreviewController($stateParams, $state, BackendService, $log, DeckService, $mdDialog, $translate) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.selectedDeck = new BackendService.Deck();
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectDeck = selectDeck;
    vm.editDeck = editDeck;
    vm.selectCard = selectCard;
    vm.editCard = editCard;
    vm.removeCard = removeCard;
    vm.clear = clear;
    vm.changeVisibility = changeVisibility;


    vm.access = $stateParams.access;

    function changeVisibility(card){
      return BackendService.getDeckById($stateParams.deckId)
        .then(function success(data) {
          vm.deck = data;
          return vm.deck.updateFlashcard(card.id, card.question, card.answer, !card.isHidden)
        },
        function error(){
          var message = 'I cant get deck';
          alert(message);
          throw message;
        })
        .then(function reload(){
          $state.reload();
        })
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

    function createDeck(){
      DeckService.setDeckObj({name: vm.searchText});
      $state.go("deck.addCard", {deckId:null , cardId: null});
    }


    function editDeck(){
      $state.go("deck.addCard", {deckId:vm.selectedDeck.id , cardId: null});
    }

    function selectDeck(deck) {
      if (deck) {
        if (deck.id && deck.id != $stateParams.deckId) {
          $stateParams.deckId = deck.id;
          $stateParams.cardId = null;
          $state.go($state.current, {deckId: deck.id}, {notify: false});
          initDeck(deck.id);
        }
        else if (!deck.id) {
          createDeck();
        }
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

    function editCard(card){
      DeckService.setCardObj(card);
      $state.go("deck.addCard", {deckId: vm.selectedDeck.id , cardId: card.id});
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
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
      }
      pickUpCard($stateParams.cardId);
    }
    initDeck($stateParams.deckId);

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
          , function () {
            $log.log('do nothing')
          }
        )
    }
  }

})();
