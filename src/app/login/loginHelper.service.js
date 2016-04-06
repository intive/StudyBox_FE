(function(){
  'use strict';
  angular
  .module('login')
  .service('LoginHelper', LoginHelper);

  /**ngInject*/
  function LoginHelper($cookies) {
    var loginHelper = {
      getToken: getToken
    };
    return loginHelper;

    function getToken() {
      var token = $cookies.get('token');
      return token;
    }
  }
})();