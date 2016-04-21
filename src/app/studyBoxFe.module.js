(function() {
  'use strict';

  angular
    .module('studyBoxFe', [
      /* Angular modules */
      'ngAnimate',
      'ngCookies',
      'ngMaterial',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngFileUpload',

      /*3rd party modules*/
      'ui.router',
      'angular-md5',
      'toastr',
      'pascalprecht.translate',

      /*team modules*/
      'translator',
      'backend',
      'registration',
      'deck',
      'navbar',
      'decks',
      'login',
      'test'
    ]);
})();
