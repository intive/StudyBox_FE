(function () {
  'use strict';

  angular
    .module('deck')
    .controller('DeckController', DeckController);

  /** @ngInject */
  function DeckController($stateParams, $state, BackendService, $log, DeckService, $mdDialog, $translate) {
    var vm = this;
    vm.deckId = $stateParams.deckId;
    vm.selectedDeck = new BackendService.Deck();
    vm.load = false;
    vm.getDecks = getDecks;
    vm.selectedDeckChange = selectedDeckChange;
    vm.deckDataChange = deckDataChange;
    vm.createDeck = createDeck;
    vm.selectDeck = selectDeck;
    vm.editDeck = editDeck;
    vm.saveDeck = saveDeck;
    vm.selectCard = selectCard;
    vm.editCard = editCard;
    vm.removeCard = removeCard;
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

    function deckDataChange() {
      vm.dataChanged = true;
      DeckService.setNewDeck({name: vm.searchText, access:vm.deckAccess})
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
      DeckService.setDeckObj(deck);
      if($stateParams.deckId){
        $stateParams.deckId = null;
        $stateParams.cardId = null;
        $state.go("deck.addCard", {deckId:null , cardId: null});
        //initDeck(null);
      }
    }

    function editDeck(){
      $state.go("deck.addCard", {deckId:vm.selectedDeck.id , cardId: null});
    }

    function selectDeck(deck) {
      DeckService.setDeckObj(deck);
      if (deck.id != $stateParams.deckId){
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        $state.go($state.current, {deckId: deck.id}, {notify:false});
        initDeck(deck.id);
      }
    }

    function saveDeck(){
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

    function selectCard(card) {
      DeckService.setCardObj(card);
      //for selecting on ui (ng-repeat)
      if(card.id !=vm.selectedCardId) {
        vm.selectedCardId = card.id;
        $state.go($state.current, {cardId: card.id}, {notify:true});
      } else {
        vm.selectedCardId = false;
        $state.go($state.current, {cardId: null}, {notify:true});
      }
    }

    function editCard(cardId){
      console.log(cardId)
      $state.go("deck.addCard", {deckId: vm.selectedDeck.id , cardId: cardId});
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
        $state.go('deck.addCard');
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
