(function() {
  'use strict';
  angular
  .module('login')
  .factory('LoginInterceptor', LoginInterceptor);

  /**ngInject*/
  function LoginInterceptor(LoginHelperService) {
    var loginInterceptor = {
      request: request
    };
    return loginInterceptor;
    
    function request(config) {
      var token = LoginHelperService.getToken();
      if (token) {
        config.headers.Authorization = "Basic " + token;
      } else {
        config.headers.Authorization = "";
      }
      return config;
    }
  }
})();