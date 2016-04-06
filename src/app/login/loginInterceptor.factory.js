(function() {
  'use strict';
  angular
  .module('login')
  .factory('LoginInterceptor', LoginInterceptor);

  /**ngInject*/
  function LoginInterceptor(LoginHelper) {
    var token = LoginHelper.getToken();
    var loginInterceptor = {
      request: request
    };
    return loginInterceptor;
    function request(config) {
      if (token) {
        config.headers.Authorization = "Basic " + token;
      }
      return config;
    }
  }
})();