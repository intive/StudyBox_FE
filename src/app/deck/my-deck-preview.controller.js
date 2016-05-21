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
    vm.load = false;

    vm.clear = clear;
    vm.changeVisibility = changeVisibility;
    vm.checkIfAllHidden = checkIfAllHidden;
    vm.access = $stateParams.access;

    vm.addHint = addHint;
    vm.removeHint = removeHint;

    vm.createTip = createTip;
    vm.deleteTip = deleteTip;
    vm.updateTip = updateTip;
    vm.createTips = createTips;
    vm.getAllTips = getAllTips;

    vm.trimString = trimString;
    vm.trimInput = trimInput;
    vm.maxHintCount = 5;
    vm.trimInput = trimInput;
    vm.pasteChecker = pasteChecker;

    vm.cardSaveToast = cardSaveToast;
    vm.getToastPosition = getToastPosition;
    vm.pageDialog = pageDialog;
    vm.hintsListDialog = hintsListDialog;
    vm.cancelDialog = cancelDialog;

    vm.submitCard = submitCard;
    vm.createCard = createCard;
    vm.removeCard = removeCard;
    vm.setNewCard = setNewCard;
    vm.setCard = setCard;
    vm.getCards = getCards;

    vm.selectDeck = selectDeck;
    vm.editDeckName = editDeckName;
    vm.getDecks = getDecks;
    vm.createDeckWithFlashCard = createDeckWithFlashCard;
    vm.deckAccessChange = deckAccessChange;
    vm.changeDeckNameDialog = changeDeckNameDialog;

    //tworzenie nowej tali
    if(!vm.deckId){
      vm.createNewDeckFlag = true;
      vm.isPublic = false;
      vm.isPublicMsg = $translate.instant("preview-PRIVATE_DECK");
      // pageDialog(null, null, true);
    }else
      initDeck(vm.deckId);

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
      if(angular.isDefined(index.id))
        deleteTip(index);
      if(vm.hints.length == 0)
        vm.addHintTranslate = $translate.instant("preview-HINT");
    }

    function createTip(deck, card, tip){
      TipsService.createNewTip(deck, card, tip.essence)
      .then(function success() {},
      function error(){
        throw 'Nie można utworzyć podpowiedzi';
      });
    }

    function deleteTip(tip){
      TipsService.deleteTip(vm.deckId, vm.cardId, tip.id)
      .then(function success() {},
      function error(){
        throw 'Nie można usunąć podpowiedzi';
      });
    }

    function updateTip(deck, card, tip){
      TipsService.updateTip(deck, card, tip.id, tip.essence)
      .then(function success() {},
      function error(){
        throw 'Nie można edytować podpowiedzi';
      });
    }

    function createTips(deck, card){
       for(var i=0; i < vm.hints.length; i++){
        if(vm.hints[i].hintChanged == true){
          //tworzenie
          if(angular.isUndefined(vm.hints[i].id))
            createTip(deck, card, vm.hints[i]);
          else //edycja
            updateTip(deck, card, vm.hints[i]);
        }
      }
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

    //ucinanie bialych znakow na poczatku i koncu inputa
    function trimString(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }

    //ucinanie inputa tylko w przypadku wklejenia
    function trimInput(field){
      if(vm.paste){
        if(vm.questionFocus)
          field.question = field.question.substring(0, 1000);
        else if(vm.answerFocus)
          field.answer = field.answer.substring(0, 1000);
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

      //tworzenie nowej tali
      if(vm.createNewDeckFlag){
        createDeckWithFlashCard();
        vm.deckNameRequired = true;
        vm.createNewDeckFlag = !vm.createNewDeckFlag;
      }else{
        vm.deckNameRequired = false;
        //dodanie nowej fiszki
        if(vm.addCard == true){
          createCard();
          vm.addCard = !vm.addCard;
        }else{  //edycja istniejacej fiszki
          updateCard();
          createTips(vm.deckId, vm.cardId);
        }
      }

      cancelDialog();
      cardSaveToast();

      if(vm.hints.length == 0)
        vm.addHintTranslate = $translate.instant("preview-HINT");
    }



    function updateCard(){
      BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
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
          vm.deck.createFlashcard(vm.question, vm.answer, vm.isHidden)
          .then(function success(data) {
            vm.cardId = data.id;
            createTips(vm.deckId, vm.cardId);
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
      BackendService.createNewDeck(vm.newDeckName, vm.isPublic)
        .then(function success(data) {
          vm.deck = data;
          vm.deck.createFlashcard(vm.question, vm.answer, vm.isHidden)
          .then(function success(data) {
            vm.deckId = data.deckId;
            vm.cardId = data.id
            createTips(vm.deckId, vm.cardId);
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
      else
        $state.go('test', { deckId: vm.deckId})
    }

    function hideFilter(isHidden) {
      return function filterFn(card) {
        return (card.isHidden === isHidden);
      };
    }
    //zmiana widocznsci fiszki
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
          vm.decks = BackendService.getDecks("private");
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
    //przenoszenie na widok tworzenia nowej tallii
    function createDeck(){
      $state.go("my-deck-preview-new-card", {}, {reload: true});
    }

    function editDeckName(deckName){
      BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
          vm.deck.updateDeck(deckName, vm.deck.isPublic)
          .then(function success(){},
          function error(){
            throw "Nie można zaktualizować talii";
          })
        },
        function error(){
          throw "Nie można pobrać talii";
        });
      cancelDialog();
      cardSaveToast();
      vm.searchText = vm.newDeckName;
    }
    //wybor talli z autocomplete'a
    function selectDeck(deck) {
      if (!deck) return;

      if (deck.id && deck.id != $stateParams.deckId) {
        $stateParams.deckId = deck.id;
        $stateParams.cardId = null;
        $state.go($state.current, {deckId: deck.id}, {notify: false});
        initDeck(deck.id);
      }
      else if (!deck.id)
        createDeck();
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
    //czyszczenie inputa w autocomplete'cie
    function clear() {
      vm.searchText = null;
    }

    function getCards() {
      vm.selectedDeck.getFlashcards()
        .then(function (data) {
          vm.cards = data;
        },
        function (){
          throw 'Nie można pobrać fiszek';
        });
    }

    function deleteCardDialog(cardId, cardNo) {
      var content = $translate.instant("deck-REMOVE_CARD_MODAL");
      if (cardNo < 2)
        content = ($translate.instant("deck-REMOVE_LAST_CARD_MODAL"));
      var confirm = $mdDialog.confirm()
        .title($translate.instant("deck-REMOVE_CARD"))
        .textContent(content)
        .ok($translate.instant("deck-REMOVE_CARD"))
        .cancel($translate.instant("deck-NO"));
        $mdDialog.show(confirm)
          .then(function () {
            //usuwanie fiszki
            vm.selectedDeck.removeFlashcard(cardId)
              .then(function () {
                //delete deck if toastPosition card
                if (cardNo < 2) {
                  $log.warn('toastPosition one flashcard');
                  vm.selectedDeck.remove().then(function () {
                    $state.go('decks');
                  });
                }else
                  $state.reload();
              }, function () {
                throw "Nie można usunąć fiszki"
              });
          }, function () {}
        )
    }

    function deckAccessChange(){
      if(vm.isPublic == false)
        vm.isPublicMsg = $translate.instant("preview-PRIVATE_DECK");
      else
        vm.isPublicMsg = $translate.instant("preview-PUBLIC_DECK");

      //gdy tworzymy nowa talie
      if(vm.createNewDeckFlag) return;

      BackendService.getDeckById(vm.deckId)
        .then(function success(data) {
          vm.deck = data;
          return vm.deck.updateDeck(vm.deck.name, vm.isPublic);
        },
        function error(){
          throw "Nie można pobrać talii";
        })
    }

    function initDeck(deckId) {
      if(deckId){
        BackendService.getDeckById(deckId)
          .then(function (data) {
            vm.selectedDeck = data;
            vm.selectedItem = vm.selectedDeck;
            vm.isPublic = vm.selectedDeck.isPublic;

            if(vm.isPublic == false)
              vm.isPublicMsg = $translate.instant("preview-PRIVATE_DECK");
            else
              vm.isPublicMsg = $translate.instant("preview-PUBLIC_DECK");

            getCards();
          },
          function (){
            throw "Nie można pobrać talii";
          });
      } else {
        vm.selectedItem = vm.selectedDeck;
        vm.deckAccess = 'private';
      }
    }

    function setCard(card){
      vm.card = card;
      vm.question = card.question;
      vm.answer = card.answer;
      vm.cardId = card.id;
      getAllTips(vm.cardId);
    }

    function setNewCard(){
      vm.hints = [];
      vm.question = "";
      vm.answer = "";
      vm.isHidden = false;
    }

    function changeDeckNameDialog(ev){
      vm.newDeckName = vm.searchText;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: MyDeckPreviewController,
        templateUrl: 'app/deck/changeDeckName.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
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

    //modal z edycja fiszki
    function pageDialog(ev, card, editStatus) {
      //edycja
      if(editStatus){
        vm.editMode = true;
        vm.isHidden = card.isHidden;
        setCard(card);
      }
      else{ //dodanie nowej fiszki
        vm.editMode = false;
        vm.addHintTranslate = $translate.instant("preview-HINT");
        setNewCard();
      }
      var clickOutside = true;

      if(vm.createNewDeckFlag)
        clickOutside = false;

      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: MyDeckPreviewController,
        templateUrl: 'app/deck/cardEdit.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: clickOutside,
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
      if(vm.createNewDeckFlag)
        $state.go("decks");
      else
        $mdDialog.hide();
    }

}
})();
