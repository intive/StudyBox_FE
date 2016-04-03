/**
* Dokumentacja
* 
* isLogged(user) - zwraca true, jeśli użytkownik jest zalogowany, false w przeciwnym przypadku
* doLogin(user, password) - wysyła żądanie logowania, zwraca identyfikator ciasteczka lub komunikat błędu
* doLogout(user) - kasuje ciasteczko, zwraca true (sukces) lub false
* 
*/
(function() {
  'use strict';
  angular
    .module('login')
    .service('LoginService', LoginService);

    /** ngInject */
    function LoginService() {
      var vm = this;
      var loginService = {
        isLogged: isLogged,
        doLogin: doLogin,
        doLogout: doLogout
      };
      return loginService;

      function isLogged() {
        return true;
      }

      function doLogin(user, pass) {
        var token = btoa(user + ":" + pass);
        alert("Witaj!\nTwój email: " + user + "\ntoken: " + token + "\n\nPo zdekodowaniu - " + atob(token));
      }

      function doLogout() {
        return false;
      }
    }
})();
