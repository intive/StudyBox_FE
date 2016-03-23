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


    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent');

    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
