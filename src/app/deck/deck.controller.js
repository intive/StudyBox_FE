(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, BackendService, $log, DeckService, $mdDialog, $translate) {
    var vm = this;
    vm.selectedDeck = new BackendService.Deck();
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectedDeckChange = selectedDeckChange;
    vm.createDeck = createDeck;
    vm.selectDeck = selectDeck;
    vm.selectCard = selectCard;
    vm.removeCard = removeCard;
    vm.clear = clear;

    function getDecks(query) {
      //for not loading list of deck on page init
      if (vm.load) {
        if (!vm.decks) {
          //create request for deck list
          vm.decks = BackendService.getDecks();
        }
        return vm.decks
          .then(function (result) {
            var list = query ? result.filter(queryFilter(query)) : result;
            if (query){
              list.push({name:query});
            }
            return list
          })
      } else {
        vm.load = true
      }
    }

    function selectedDeckChange(deck) {
      if (deck) {
        if (deck.id){
          selectDeck(deck);
        } else {
          createDeck(deck);
        }
      }
    }

    function createDeck(deck) {
      //set new deck name
      DeckService.setDeckObj(deck);
      if($stateParams.deckId){
        $stateParams.deckId = null;
        $stateParams.cardId = null;
        initDeck(null)
      }
    }

    function selectDeck(deck) {
      if (deck.id != $stateParams.deckId){
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        initDeck(deck.id)
      }
    }

    function selectCard(card) {
      DeckService.setCardObj(card);
      //for selecting on ui (ng-repeat)
      if(card.id !=vm.selectedCardId) {
        vm.selectedCardId = card.id;
        $state.go("deck.addCard", {cardId: card.id}, {notify:true})
      } else {
        vm.selectedCardId = false
        $state.go("deck.addCard", {cardId: null}, {notify:true})
      }
    }

    function removeCard(cardId){
      deleteCardDialog(cardId, vm.cards.length )
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
            getCards();
          }, function (e) {
            $log.error(e);
          });
      } else {
        vm.selectedDeck = DeckService.getDeckObj();
        vm.cards=[];
      }
      //clean card field
      vm.selectedDeck = DeckService.setDeckObj(null);
      $stateParams.cardId = null;
      $state.reload('deck.addCard')
    }
    initDeck($stateParams.deckId);

    //DELETE CARD DIALOG
    function deleteCardDialog(cardId, cardNo) {
      var content = $translate.instant("deck-REMOVE_CARD_MODAL");
      //info for last card
      if (cardNo < 2) {
        content = content.concat("\n"+ $translate.instant("deck-REMOVE_LAST_CARD_MODAL"))
      }
      var confirm = $mdDialog.confirm()
        .title($translate.instant("deck-REMOVE_CARD"))
        .textContent(content)
        .ok($translate.instant("deck-YES"))
        .cancel($translate.instant("deck-NO"));
      $mdDialog.show(confirm).then(function () {
        //delete card
        vm.selectedDeck.removeFlashcard(cardId)
          .then(function (result) {
            //delete deck if last card
            if (cardNo < 2) {
              $log.warn('last one flashcard');
              vm.selectedDeck.remove().then(function () {
                $state.go('decks')
              });
            } else {
              $state.go("deck.addCard", {deckId: vm.selectedDeck.id, cardId: null});
              getCards();
              $log.log(result);
            }

          }, function (e) {
            $log.error(e);
          });
      });
    }
  }
})();
