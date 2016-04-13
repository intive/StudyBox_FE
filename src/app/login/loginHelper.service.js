(function(){
  'use strict';
  angular
  .module('login')
  .service('LoginHelperService', LoginHelper);

  /**ngInject*/
  function LoginHelper($cookies) {
    var loginHelper = {
      isLogged: isLogged,
      getToken: getToken,
      doLogout: doLogout,
      setCookie: setCookie
    };
    return loginHelper;

    function isLogged() {
      if (angular.isDefined($cookies.get("userMail")) && angular.isDefined($cookies.get("token"))) {
        return true;
      } else {
        return false;
      }
    }

    function getToken() {
      var token = $cookies.get('token');
      return token;
    }

    function doLogout() {
      $cookies.remove("userMail");
      $cookies.remove("token");
      var logged = isLogged();
      return !logged;
    }

    function setCookie(user, token) {
      $cookies.put("userMail", user);
      $cookies.put("token", token);
    }
  }
})();