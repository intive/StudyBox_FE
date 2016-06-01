(function() {
  'use strict';

  angular
  .module('login')
  .controller('LoginController', LoginController);

  function LoginController($state, LoginService, $stateParams, LoginHelperService, $log, $q) {
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
      var loginUrl = "api/decks/me";
      var targetState = "decks";
      var token = btoa(user + ":" + pass);
      LoginHelperService.setCookie(user, token);
      LoginService.doLogin(user, pass, loginUrl)
      .then(
        function() {
          if(vm.deckId) {
            if(vm.deckEdit == "d-e") {
              $state.go("deck.addCard", {"deckId": vm.deckId , cardId: null});
            } else {
              if(vm.deckEdit == "d-p"){
              $state.go("deck-preview", {"deckId": vm.deckId});
              }
              else{
              $state.go("my-deck-preview", {"deckId": vm.deckId});
              }
            }
          } else {
            $state.go(targetState);
          }
        },
        function(data){
          LoginHelperService.setCookie();
          alert("Logowanie nieudane!\n" + "HTTP: " + data.status + "\n" + data.data.message);
          $q.reject(data);
        });
    }
  }
})();
