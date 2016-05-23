(function() {
  'use strict';

  angular
    .module('navbar')
    .service('NavbarService', NavbarService);

  /* @ngInject */
  function NavbarService() {
    this.controller = null;
  }
})();
