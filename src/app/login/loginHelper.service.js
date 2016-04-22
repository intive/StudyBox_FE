(function(){
  'use strict';
  angular
  .module('login')
  .service('LoginHelperService', LoginHelper);

  /**ngInject*/
  function LoginHelper($cookies,$translate) {
    var loginHelper = {
      isLogged: isLogged,
      getToken: getToken,
      getUserEmail: getUserEmail,
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

    function getUserEmail() {
      var email = $cookies.get("userMail");
      if (email == null) email = $translate.instant("login-GUEST");
      return email;
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
