(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .config(config);

  /** @ngInject */
  function config($mdThemingProvider) {
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
      'hue-1': '#ffaa55',
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

    $mdThemingProvider.definePalette('graphite', {
      '50': '#c7c7c7',
      '100': '#a0a0a0',
      '200': '#848484',
      '300': '#616161',
      '400': '#515151',
      '500': '#424242',
      '600': '#333333',
      '700': '#232323',
      '800': '#141414',
      '900': '#050505',
      'A100': '#c7c7c7',
      'A200': '#a0a0a0',
      'A400': '#515151',
      'A700': '#232323',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    });
    $mdThemingProvider.definePalette('customGray', {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#fafafa',
      '600': '#ebebeb',
      '700': '#dbdbdb',
      '800': '#cccccc',
      '900': '#bdbdbd',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#dbdbdb',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
    });

    $mdThemingProvider.theme('alt')
      .primaryPalette('graphite')
      .accentPalette('customGray');

  }
})();
