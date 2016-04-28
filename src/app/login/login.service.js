/**
* Dokumentacja
* 
* doLogin(user, password, loginUrl) - wysyła żądanie logowania, zwraca promise lub błąd
* 
*/
(function() {
  'use strict';
  angular
  .module('login')
  .service('LoginService', LoginService);

  /** ngInject */
  function LoginService($http, $log, $q) {
    var loginService = {
      doLogin: doLogin
    };
    return loginService;

    function doLogin(user, pass, loginUrl) {
      var token = btoa(user + ":" + pass);
      var method = "GET";
      setHeader(token);
      var loginResponse = $http({method: method, url: loginUrl})
        .then(
          function successCallback(response) {
            return response;
          },
          function errorCallback(response) {
            return $q.reject(response);
          });
      return loginResponse;
    }

    function setHeader(token) {
      $http.defaults.headers.common.Authorization = "Basic " + token;
    }

  }
})();
