(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
