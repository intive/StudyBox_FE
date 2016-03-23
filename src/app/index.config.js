(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // am conf theme
    var customPrimary = {
      '50': '#bee4ff',
      '100': '#72c3ff',
      '200': '#3aacff',
      '300': '#008bf1',
      '400': '#007ad3',
      '500': '#0068b4',
      '600': '#005695',
      '700': '#004577',
      '800': '#003358',
      '900': '#00213a',
      'A100': '#bee4ff',
      'A200': '#72c3ff',
      'A400': '#007ad3',
      'A700': '#004577',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
      customPrimary);

    var customAccent = {
      '50': '#fff4f9',
      '100': '#ffa8cc',
      '200': '#ff70ab',
      '300': '#ff2881',
      '400': '#ff0a6f',
      '500': '#ea0061',
      '600': '#cb0054',
      '700': '#ad0048',
      '800': '#8e003b',
      '900': '#70002e',
      'A100': '#fff4f9',
      'A200': '#ffa8cc',
      'A400': '#ff0a6f',
      'A700': '#ad0048',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    };
    $mdThemingProvider
      .definePalette('customAccent',
      customAccent);


    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent');

    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
