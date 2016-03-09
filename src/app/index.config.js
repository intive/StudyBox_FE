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
      '50': '#ff6aa8',
      '100': '#ff5199',
      '200': '#ff378a',
      '300': '#ff1e7b',
      '400': '#ff046c',
      '500': '#EA0061',
      '600': '#d00056',
      '700': '#b7004c',
      '800': '#9d0041',
      '900': '#840037',
      'A100': '#ff84b7',
      'A200': '#ff9dc6',
      'A400': '#ffb7d5',
      'A700': '#6a002c'
    };
    $mdThemingProvider
      .definePalette('customAccent',
      customAccent);

    var customWarn = {
      '50': '#828282',
      '100': '#757575',
      '200': '#686868',
      '300': '#5b5b5b',
      '400': '#4f4f4f',
      '500': '#424242',
      '600': '#353535',
      '700': '#282828',
      '800': '#1c1c1c',
      '900': '#0f0f0f',
      'A100': '#8e8e8e',
      'A200': '#9b9b9b',
      'A400': '#a8a8a8',
      'A700': '#020202'
    };
    $mdThemingProvider
      .definePalette('customWarn',
      customWarn);

    var customBackground = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#FAFAFA',
      '600': '#ededed',
      '700': '#e0e0e0',
      '800': '#d4d4d4',
      '900': '#c7c7c7',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#bababa'
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
