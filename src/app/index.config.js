(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // am conf theme
    var customPrimary = {
      '50': '#34a9ff',
      '100': '#1b9fff',
      '200': '#0194ff',
      '300': '#0085e7',
      '400': '#0077cd',
      '500': '#0068B4',
      '600': '#00599a',
      '700': '#004b81',
      '800': '#003c67',
      '900': '#002d4e',
      'A100': '#4eb4ff',
      'A200': '#67bfff',
      'A400': '#81caff',
      'A700': '#001e34'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
      customPrimary);

    var customAccent = {
      '50': '#23ffd4',
      '100': '#0affcf',
      '200': '#00efc0',
      '300': '#00d6ac',
      '400': '#00bc97',
      '500': '#00a383',
      '600': '#00896f',
      '700': '#00705a',
      '800': '#005646',
      '900': '#003d31',
      'A100': '#3dffd9',
      'A200': '#56ffde',
      'A400': '#70ffe3',
      'A700': '#00231d'
    };
    $mdThemingProvider
      .definePalette('customAccent',
      customAccent);

    var customWarn = {
      '50': '#ffb280',
      '100': '#ffa266',
      '200': '#ff934d',
      '300': '#ff8333',
      '400': '#ff741a',
      '500': '#ff6400',
      '600': '#e65a00',
      '700': '#cc5000',
      '800': '#b34600',
      '900': '#993c00',
      'A100': '#ffc199',
      'A200': '#ffd1b3',
      'A400': '#ffe0cc',
      'A700': '#803200'
    };
    $mdThemingProvider
      .definePalette('customWarn',
      customWarn);

    var customBackground = {
      '50': '#737373',
      '100': '#666666',
      '200': '#595959',
      '300': '#4d4d4d',
      '400': '#404040',
      '500': '#333',
      '600': '#262626',
      '700': '#1a1a1a',
      '800': '#0d0d0d',
      '900': '#000000',
      'A100': '#808080',
      'A200': '#8c8c8c',
      'A400': '#999999',
      'A700': '#000000'
    };
    $mdThemingProvider
      .definePalette('customBackground',
      customBackground);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
      .backgroundPalette('customBackground')
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
