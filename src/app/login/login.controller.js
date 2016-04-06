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
        var name = vm.data.name;
        var loginUrl = "api/decks/";
        var targetState = "decks";
        LoginService.doLogin(user, pass, name, loginUrl)
        .then(function(data){
          if(data.status === 200) {
            $state.go(targetState);
          }else{
            alert("Logowanie nieudane!\n\n" + "HTTP: " + data.status + "\n" + data.statusText);
          }          
        });         
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
