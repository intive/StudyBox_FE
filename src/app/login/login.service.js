/**
* Dokumentacja
* 
* isLogged() - zwraca true, jeśli użytkownik jest zalogowany, false w przeciwnym przypadku
* doLogin(user, password, loginUrl) - wysyła żądanie logowania, zwraca promise lub błąd
* doLogout() - kasuje ciasteczko, zwraca true (sukces) lub false
* 
*/
(function() {
  'use strict';
  angular
  .module('login')
  .service('LoginService', LoginService);

  /** ngInject */
  function LoginService($http, $log, $q, LoginHelper) {
    var loginService = {
      doLogin: doLogin
    };
    return loginService;

    function doLogin(user, pass, loginUrl) {
      var token = btoa(user + ":" + pass);
      var method = "GET";
      var loginResponse;
      if (angular.isDefined(user) && angular.isDefined(pass)) {
        setHeader(token);
        loginResponse = $http({method: method, url: loginUrl})
        .then(
          function successCallback(response) {            
            LoginHelper.setCookie(user, token);            
            return response;
          },
          function errorCallback(response) {
            alert("Logowanie nieudane!\n\nHTTP " + response.status);
            return $q.reject(response);
          });
      }
      return loginResponse;
    }

    function setHeader(token) {
      $http.defaults.headers.common.Authorization = "Basic " + token;
    }

  }
})();
