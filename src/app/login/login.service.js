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
  function LoginService($http, $log, $q, $cookies) {
    var loginService = {
      isLogged: isLogged,
      doLogin: doLogin,
      doLogout: doLogout
    };
    return loginService;

    function isLogged() {
      if (angular.isDefined($cookies.get("userMail")) && angular.isDefined($cookies.get("token"))) {
        return true;
      } else {
        return false;
      }
    }

    function doLogin(user, pass, userName, loginUrl) {
      var token = btoa(user + ":" + pass);
      var method = "GET";
      var loginResponse;
      if (angular.isDefined(user) && angular.isDefined(pass)) {
        setHeader(token);
        loginResponse = $http({method: method, url: loginUrl})
        .then(
          function successCallback(response) {            
            setCookie(user, token, userName);            
            return response;
          },
          function errorCallback(response) {
            alert("Logowanie nieudane!\n\nHTTP " + response.status);
            return $q.reject(response);
          });
      }
      return loginResponse;
    }

    function doLogout() {
      $cookies.remove("userMail");
      $cookies.remove("token");
      $cookies.remove("name");
      var logged = isLogged();
      return !logged;
    }

    function setHeader(token) {
      $http.defaults.headers.common.Authorization = "Basic " + token;
    }

    function setCookie(user, token, userName) {
      $cookies.put("userMail", user);
      $cookies.put("token", token);
      $cookies.put("name", userName);
    }
  }
})();
