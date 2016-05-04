(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(config);

  /** @ngInject */
  function config($logProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
