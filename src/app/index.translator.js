(function() {
  'use strict';

  angular
    .module('translator', ['pascalprecht.translate'])
    .config(translatorConfig);

  /** @ngInject */
  function translatorConfig($translateProvider) {
    // Translations config
    $translateProvider.useStaticFilesLoader({
      prefix: '/assets/i18n/',
      suffix: '/common.json'
    });
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('pl_PL');
  }

})();