(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .run(ifOnline);

/** @ngInject */
  function ifOnline($rootScope, $window, $mdDialog, $document) {
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
          .title('Uwaga!')
          .textContent('Utraciłeś połączenie z internetem. Spróbuj później.')
          .ariaLabel('Alert Dialog')
          .ok('Rozumiem')
      );
    }

    function showOnlineAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title('Uwaga!')
          .textContent('Odzyskałeś połączenie z internetem, możesz kontynuować.')
          .ariaLabel('Alert Dialog')
          .ok('Rozumiem')
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
