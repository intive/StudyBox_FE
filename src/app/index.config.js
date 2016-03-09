(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // am conf theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
