(function () {
  'use strict';

  angular
    .module('deck')
    .controller('MyDeckPreviewController', MyDeckPreviewController);

  /** @ngInject */
  function MyDeckPreviewController($stateParams, $state, BackendService, $log,
                                    DeckService, $mdDialog, $translate, $document,
                                    $mdMedia, $scope, TipsService, $mdToast) {

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
    vm.checkIfAllHidden = checkIfAllHidden;
    vm.access = $stateParams.access;
    vm.getAllTips = getAllTips;
    vm.maxHintCount = 5;
    vm.trimInput = trimInput;
    vm.pasteChecker = pasteChecker;

    vm.addHint = addHint;
    vm.removeHint = removeHint;

    vm.createTip = createTip;
    vm.deleteTip = deleteTip;
    vm.updateTip = updateTip;
    vm.createTips = createTips;
    vm.createUpdateTips = createUpdateTips;


    vm.trimString = trimString;
    vm.trimInput = trimInput;

    vm.cardSaveToast = cardSaveToast;
    vm.getToastPosition = getToastPosition;
    vm.pageDialog = pageDialog;
    vm.hintsListDialog = hintsListDialog;
    vm.cancelDialog = cancelDialog;

    vm.submitCard = submitCard;
    vm.createCard = createCard;
    vm.setNewCard = setNewCard;

    vm.setCard = setCard;
    vm.createDeckWithFlashCard = createDeckWithFlashCard;
    vm.cardAccessChange = cardAccessChange;
    vm.deckAccessChange = deckAccessChange;
    // vm.isHidden = false;

    //tworzenie nowej tali
    if(!vm.deckId){
      vm.createNewDeckFlag = true;
      vm.isHidden = true;
      vm.isPublic = false;
      vm.isHiddenMsg = $translate.instant("preview-PRIVATE_CARD");
      // pageDialog(null, null, true);
    }

    //dodanie nowego inputa dla podpowiedzi
    function addHint(){
      if(vm.hints.length < vm.maxHintCount){
        vm.hintNumber = vm.hints.length + 1;
        vm.hints.push({'count':+ vm.hintNumber});
        vm.addHintTranslate = $translate.instant("preview-ANOTHER_HINT");
      }
    }

    //usuniecie inputa dla podpoweidzi
    function removeHint(index){
      vm.hints.splice(vm.hints.indexOf(index), 1);
      deleteTip(index);
      if(vm.hints.length == 0)
        vm.addHintTranslate = $translate.instant("preview-HINT");
    }

    function createTip(essence){
      $log.info("createTip vm.cardId "+vm.cardId);
      TipsService.createNewTip(vm.deckId, vm.cardId, essence)
      .then(function success() {

      },
      function error(){
        throw 'Nie można utworzyć podpowiedzi';
      });
    }

    function deleteTip(tipId){
      TipsService.deleteTip(vm.deckId, vm.cardId, tipId.id)
      .then(function success() {

      },
      function error(){
        throw 'Nie można usunąć podpowiedzi';
      });
    }

    function updateTip(tipId, essence){
      TipsService.updateTip(vm.deckId, vm.cardId, tipId, essence)
      .then(function success() {

      },
      function error(){
        throw 'Nie można edytować podpowiedzi';
      });
    }

    function createTips(){
      for(var i=0; i < vm.hints.length; i++){
        if(vm.hints[i].hintChanged == true){
          //tworzenie
          if(angular.isUndefined(vm.hints[i].id))
            createTip(vm.hints[i].essence);
        }
      }
    }

    function createUpdateTips(){
      for(var i=0; i < vm.hints.length; i++){
        if(vm.hints[i].hintChanged == true){
          //tworzenie
          if(angular.isUndefined(vm.hints[i].id))
            createTip(vm.hints[i].essence);
          else //edycja
            updateTip(vm.hints[i].id, vm.hints[i].essence);
        }
      }
    }

    //ucinanie bialych znakow na poczatku i koncu inputa
    function trimString(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }

    //ucinanie inputa tylko w przypadku wklejenia
    function trimInput(field){
      if(vm.paste){
        if(vm.questionFocus){
          field.question = field.question.substring(0, 1000);
        }
        else if(vm.answerFocus){
          field.answer = field.answer.substring(0, 1000);
        }
        vm.paste = false;
      }
    }

    function pasteChecker(){
      vm.paste = true;
    }

    function submitCard(isValid) {
      //gdy formularz nie przechodzi walidacji
      if(!isValid) return;
      if(!vm.answer || vm.answer.length > 1000) return;
      if(!vm.question || vm.question.length > 1000) return;

      //ucina spacje przed i za
      vm.question = trimString(vm.question);
      vm.answer = trimString(vm.answer);

      // vm.newDeck = DeckService.getNewDeck();

      //sprawdzenie nazwy talii
      // if (!vm.newDeck) {
      //   $log.warn("pusta nazwa talii");
      //   DeckService.setEmptyNameError(true);
      //   return $state.reload()
      // }
      // //sprawdzenie zmiany nazwy talii
      // if (vm.deck && vm.newDeck.name != vm.deck.name) {
      //   $log.warn("zmieniono nazwe talii");
      //   var nameChange = true;
      // }
      //Jeżeli pola nie są puste
      // var cardInDeck;
      //   if($stateParams.cardId) {
      //     cardInDeck = editFlashCard();

      //tworzenie nowej tali
      if(vm.createNewDeckFlag){
        createDeckWithFlashCard();
        vm.createNewDeckFlag = !vm.createNewDeckFlag;
      }else{
        //dodanie nowej fiszki
        if(vm.addCard == true){
          createCard();
          vm.addCard = !vm.addCard;
        }else{  //edycja istniejacej fiszki
          updateCard();
          createUpdateTips();
        }
      }


      //   } else {
      //     if($stateParams.deckId) {
      //       cardInDeck = createFlashCard();
      //     } else {
      //       cardInDeck = createDeckWithFlashCard()
      //     }
      //   }
      // //update deck name
      // if (nameChange) {
      //   cardInDeck
      //     .then(function success() {
      //       return vm.deck.updateDeck(vm.newDeck.name, vm.newDeck.access)
      //     },
      //     function error() {
      //       var message = 'I cant create/update card';
      //       alert(message);
      //       throw message;
      //     })
      //     .then(function success() {
      //       $state.go("deck.addCard", {deckId: vm.deck.id});
      //       $state.reload("deck");
      //     },
      //     function error() {
      //       var message = 'I cant update Deck name';
      //       alert(message);
      //       throw message;
      //     })
      // }
        cancelDialog();
        cardSaveToast();

        if(vm.hints.length == 0)
          vm.addHintTranslate = $translate.instant("preview-HINT");
    }



    function updateCard(){
      BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
          $log.info("vm.isHidden "+vm.isHidden);
          vm.deck.updateFlashcard(vm.cardId, vm.question, vm.answer, vm.isHidden)
          .then(function success(){
            $state.reload("my-deck-preview");
          },
          function error(){
            throw 'Nie można edytować fiszki';
          });
      },
      function error(){
        throw 'Nie można pobrać talii';
      });
    }

    function createCard(){
      BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
          vm.deck.createFlashcard(vm.question, vm.answer, !vm.isHidden)
          .then(function success(data) {
            vm.cardId = data.id;
            createTips();
          },
          function error(){
            throw 'Nie można dodać fiszki';
          });
          $state.reload("my-deck-preview");
      },
      function error(){
        throw 'Nie można pobrać id talii';
      });
    }

    function createDeckWithFlashCard(){
      vm.hints = [];
      $log.info("vm.isPublic "+vm.isPublic+" vm.isHidden "+vm.isHidden);
      BackendService.createNewDeck(vm.newDeckName, vm.isPublic)
        .then(function success(data) {
          vm.deck = data;
          vm.deck.createFlashcard(vm.question, vm.answer, vm.isHidden)
          .then(function success() {
            $state.go("my-deck-preview", {deckId:vm.deck.id});
          },
          function error(){
            throw 'Nie można stworzyć fiszki';
          });
        },
        function error(){
          throw 'Nie można stworzyć tali';
        });
    }

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

    function changeVisibility(card){
      return BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
          return vm.deck.updateFlashcard(card.id, card.question, card.answer, !card.isHidden)
        },
        function error(){
          var message = 'I cant get deck';
          alert(message);
          throw message;
        })
        .then(function change(){
          card.isHidden = !card.isHidden;
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
          vm.cards.isHidden = vm.isPublic;
        }, function (e) {
          $log.error(e);
        });
    }

    function getAllTips(cardId){
      TipsService.getAllTips(vm.deckId, cardId)
      .then(function success(data) {
        vm.hints = data;
        if(angular.isUndefined(vm.hints) || vm.hints.length == 0)
          vm.addHintTranslate = $translate.instant("preview-HINT");
        else
          vm.addHintTranslate = $translate.instant("preview-ANOTHER_HINT");
      },
      function error(){
        throw 'Nie można pobrać podpowiedzi';
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
      //info for toastPosition card
      if (cardNo < 2) {
        content = ($translate.instant("deck-REMOVE_toastPosition_CARD_MODAL"));
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
                //delete deck if toastPosition card
                if (cardNo < 2) {
                  $log.warn('toastPosition one flashcard');
                  vm.selectedDeck.remove().then(function () {
                    $state.go('decks');
                  });
                } else {
                  // $state.go("deck.addCard", {deckId: vm.selectedDeck.id, cardId: null});
                  $state.reload();
                  // getCards();
                  $log.log(result);
                }
              }, function (e) {
                $log.error(e);
              });
          }, function () {}
        )
    }

    function cardAccessChange() {
      if(vm.isHidden == true)
        vm.isHiddenMsg = $translate.instant("preview-PRIVATE_CARD");
      else
        vm.isHiddenMsg = $translate.instant("preview-PUBLIC_CARD");

      // var access= !accessToBool(vm.deckAccess);
      // $log.info("access "+access);
      // if (!vm.selectedDeck){
      //   DeckService.setNewDeck({name: vm.searchText, access:access});
      // } else {
      //   saveDeck(vm.selectedDeck.name, access);
      // }
    }

    function deckAccessChange() {
      if(vm.isPublic == false)
        vm.isPublicMsg = $translate.instant("preview-PRIVATE_DECK");
      else
        vm.isPublicMsg = $translate.instant("preview-PUBLIC_DECK");
    }

    function setCard(card){
      // if (vm.card){
        vm.card = card;
        vm.question = card.question;
        vm.answer = card.answer;
        vm.isHidden = card.isHidden;
        if(vm.isHidden == true)
          vm.isHiddenMsg = $translate.instant("preview-PRIVATE_CARD");
        else
          vm.isHiddenMsg = $translate.instant("preview-PUBLIC_CARD");
        vm.cardId = card.id;
        getAllTips(vm.cardId);
      // }
    }

    function setNewCard(){
      vm.hints = [];
      vm.question = "";
      vm.answer = "";
    }

    function hintsListDialog(ev, card) {
      getAllTips(card.id);
      vm.hintCardQuestion = card.question;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: MyDeckPreviewController,
        templateUrl: 'app/deck/my-hintsList.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
    }

    function pageDialog(ev, card, editStatus) {

      //edycja
      if(editStatus){
        vm.editMode = true;
        setCard(card);
      }
      else{ //dodanie nowej fiszki
        vm.editMode = false;
        setNewCard();
      }

      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: MyDeckPreviewController,
        templateUrl: 'app/deck/cardEdit.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
    }


    var toastPosition = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

    vm.toastPosition = angular.extend({}, toastPosition);
    function getToastPosition(){
      sanitizeToastPosition();
      return Object.keys(vm.toastPosition)
        .filter(function(pos) { return vm.toastPosition[pos]; })
        .join(' ');
    }

    function sanitizeToastPosition(){
      var current = vm.toastPosition;
      if ( current.bottom && toastPosition.top ) current.top = false;
      if ( current.top && toastPosition.bottom ) current.bottom = false;
      if ( current.right && toastPosition.left ) current.left = false;
      if ( current.left && toastPosition.right ) current.right = false;
      toastPosition = angular.extend({},current);
    }

    function cardSaveToast(){
      $mdToast.show(
        $mdToast.simple()
          .textContent($translate.instant("preview-SAVE_CARD_TOAST"))
          .position(vm.getToastPosition())
          .hideDelay(3000)
      );
    }

    function cancelDialog(){
      $mdDialog.hide();
    }

}
})();
