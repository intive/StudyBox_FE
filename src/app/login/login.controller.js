(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('LoginController', LoginController);

  function LoginController($document, $log, $state, $rootScope, $mdDialog) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.imagePath = "assets/images/StudyBoxLogo_xx.png";
    vm.passwordRegex = /^[^\s]+$/;

    function submit(isValid) {
      if (isValid && $rootScope.networkStatusOnline) {
        $log.info("Poprawne logowanie");
        $state.go("decks");
      }else{
        $log.info("błąd logowania");
        if(!$rootScope.networkStatusOnline)
          showOfflineLoginAlert();
      }
    }

    function showOfflineLoginAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document[0].querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title('Uwaga!')
          .textContent('Jesteś offline, nie możesz teraz się zalogować.')
          .ariaLabel('Alert Dialog')
          .ok('Rozumiem')
      );
    }
  }
})();
