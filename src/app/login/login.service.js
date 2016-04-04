/**
* Dokumentacja
* 
* isLogged(user) - zwraca true, jeśli użytkownik jest zalogowany, false w przeciwnym przypadku
* doLogin(user, password, loginUrl) - wysyła żądanie logowania, zwraca promise
* doLogout(user) - kasuje ciasteczko, zwraca true (sukces) lub false
* 
*/
(function() {
  'use strict';
  angular
  .module('login')
  .service('LoginService', LoginService);

  /** ngInject */
  function LoginService($http, $log, $q, $cookies) {
    var loginService = {
      isLogged: isLogged,
      doLogin: doLogin,
      doLogout: doLogout
    };
    return loginService;

    function isLogged() {
      return true;
    }

    function doLogin(user, pass, loginUrl) {
      var token = btoa(user + ":" + pass);
      var method = "GET";
      var loginResponse;
      var result = "";
      if (angular.isDefined(user) && angular.isDefined(pass)) {
        setHeader(token);
        loginResponse = $http({method: method, url: loginUrl})
        .then(
          function successCallback(response) {            
            setCookie(user, token);
            var cookie = $cookies.get("token");
            $log.info("Token: " + cookie);
            $log.info("Z wnętrza: " + response.status);
            alert("Witaj, użytkowniku!\n\nJesteś zalogowany jako: " + user);
            return response.data;
          },
          function errorCallback(response) {
            alert("Logowanie nieudane!\n\nHTTP " + response.status);
            return $q.reject(response.data);
          });
      }      
      $log.info(loginResponse);
      return loginResponse;
    }

    function doLogout() {
      return false;
    }

    function setHeader(token) {
      $http.defaults.headers.common.Authorization = "Basic " + token;
    }

    function setCookie(user, token) {
      $cookies.put("userID", user);
      $cookies.put("token", token);
    }
  }
})();
