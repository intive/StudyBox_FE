(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginController', LoginController);

  function LoginController($document, $log, $state, $rootScope, $mdDialog, $translate, LoginService, $cookies) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.passwordRegex = /^[^\s]+$/;

    function submit(isValid) {
      if (isValid && $rootScope.networkStatusOnline) {
        var user = vm.data.email;
        var pass = vm.data.password;
        var loginUrl = "/";
        var targetState = "decks";
        LoginService.doLogin(user, pass, loginUrl)
        .then(function(data){
          $state.go(targetState);
        });         
      }else{
        $log.info("Błąd logowania");
        if(!$rootScope.networkStatusOnline)
          showOfflineLoginAlert();
      }
      var cookie = $cookies.get("token");
      $log.info("Token kontroler: " + cookie);
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
