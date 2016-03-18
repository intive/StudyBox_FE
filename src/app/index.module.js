(function() {
  'use strict';

  angular
    .module('studyBoxFe', [
      'ngAnimate',
      'ngCookies',
      'ngMaterial',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'toastr',
      'pascalprecht.translate',
      'translator',
      'studyBoxFeApp'

    ]);
  angular
    .module('studyBoxFeApp', [
      'backend',
      'studyBoxFeDeck',
      'registrationMod'
    ]);

})();
