(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .run(ifOnline);

/** @ngInject */
  function ifOnline($rootScope, $window, $mdDialog, $document) {
    $rootScope.online = $window.navigator.onLine;
    if (!$rootScope.online) {
        showOfflineAlert();
    }

    function showOfflineAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(true)
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
          .clickOutsideToClose(true)
          .title('Uwaga!')
          .textContent('Odzyskałeś połączenie z internetem, możesz kontynuować.')
          .ariaLabel('Alert Dialog')
          .ok('Rozumiem')
      );
    }

    $window.addEventListener("offline", function() {
      showOfflineAlert();
    }, false);

    $window.addEventListener("online", function() {
        showOnlineAlert();
    }, false);
  }

})();
