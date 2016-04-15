(function() {
  'use strict';

  angular
  .module('login')
  .controller('LoginController', LoginController);

  function LoginController($state, LoginService) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.passwordRegex = /^[^\s]+$/;

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
          $state.go(targetState);
        }else{
          alert("Kontroler: logowanie nieudane!\n\n" + "HTTP: " + data.status + "\n" + data.statusText);
        }          
      });         
    }
  }
})();
