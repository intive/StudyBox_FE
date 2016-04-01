(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .run(ifOnline);

/** @ngInject */
  function ifOnline($rootScope, $window, $mdDialog, $document, $translate) {
    $rootScope.online = $window.navigator.onLine;
    $rootScope.networkStatusOnline = true;
    if (!$rootScope.online) {
        showOfflineAlert();
    }

    function showOfflineAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title($translate.instant('networkAlert-WARNING'))
          .textContent($translate.instant('networkAlert-LOST_CONNECTION'))
          .ariaLabel('Alert Dialog')
          .ok($translate.instant('networkAlert-AGREE'))
      );
    }

    function showOnlineAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title($translate.instant('networkAlert-WARNING'))
          .textContent($translate.instant('networkAlert-CONNECTION_SET'))
          .ariaLabel('Alert Dialog')
          .ok($translate.instant('networkAlert-AGREE'))
      );
    }

    $window.addEventListener("offline", function() {
      showOfflineAlert();
      $rootScope.networkStatusOnline = false;
    }, false);

    $window.addEventListener("online", function() {
        showOnlineAlert();
        $rootScope.networkStatusOnline = true;
    }, false);
  }

})();
