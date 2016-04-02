(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginController', LoginController);

  function LoginController($document, $log, $state, $rootScope, $mdDialog, $translate, LoginService) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.passwordRegex = /^[^\s]+$/;

    function submit(isValid) {
      if (isValid && $rootScope.networkStatusOnline) {
        var user = vm.data.email;
        var pass = vm.data.password;
        LoginService.doLogin(user, pass);
        $log.info("Poprawne logowanie");
        $state.go("decks");
      }else{
        $log.info("Błąd logowania");
        if(!$rootScope.networkStatusOnline)
          showOfflineLoginAlert();
      }
    }

    function showOfflineLoginAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title($translate.instant('networkAlert-WARNING'))
          .textContent($translate.instant('networkAlert-OFFLINE_LOGIN'))
          .ariaLabel('Alert Dialog')
          .ok($translate.instant('networkAlert-AGREE'))
      );
    }
  }
})();
