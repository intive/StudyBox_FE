(function() {
  'use strict';

angular
.module('registration')
.run(ifOnline);

/** @ngInject */
  function ifOnline($window, $rootScope) {

    $rootScope.online = navigator.onLine;
    //gdy utracimy polaczenie z internetem
    $window.addEventListener("offline", offline, false);
    function offline () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }

    $window.addEventListener("online", online, false);
    function online() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }
  }
})();
