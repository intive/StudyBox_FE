(function() {
  'use strict';

  angular
  .module('login')
  .config(config);

  /** @ngInject */
  function config($httpProvider) {

    //set authentication headers for logged user
    $httpProvider.interceptors.push('LoginInterceptor');
  }
})();
