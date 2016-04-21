(function() {
  'use strict';

  angular
  .module('login')
  .controller('LoginController', LoginController);

  function LoginController($state, LoginService, $stateParams) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.passwordRegex = /^[^\s]+$/;

    vm.deckId = $stateParams.deckId;
    vm.deckEdit = $stateParams.deckEdit;

    function submit(isValid) {
      if(!isValid){
        return;
      }
      var user = vm.data.email;
      var pass = vm.data.password;
      var loginUrl = "api/decks/";
      var targetState = "decks";
      LoginService.doLogin(user, pass, loginUrl)
      .then(function(data){
        if(data.status === 200) {

          if(vm.deckId)
          {
            if(vm.deckEdit)
            {
            $state.go("deck.addCard", {"deckId": vm.deckId , cardId: null});
            }
            else
            {
            $state.go("my-deck-preview", {"deckId": vm.deckId})
            }
          }
          else
          {
            $state.go(targetState);
          }

        }else{
          alert("Kontroler: logowanie nieudane!\n\n" + "HTTP: " + data.status + "\n" + data.statusText);
        }
      });
    }
  }
})();
