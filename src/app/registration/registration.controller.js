(function() {
  'use strict';

angular
.module('registration')
.controller('RegistrationController', RegistrationController);

/** @ngInject */
function RegistrationController($document, $log, $window, $rootScope, $mdDialog) {
  var vm = this;
  vm.submit = submit;
  vm.reset = reset;
  vm.data = {};
  vm.imagePath = "assets/images/StudyBoxLogo_xx.png";
  vm.passwordRegex = /^[^\s]+$/;

  //wysylanie formularza
  function submit(isValid) {
    //gdy formularz jest poprawny oraz mamy polaczeneie z internetem
    if (isValid && $rootScope.networkStatusOnline) {
      $log.info("formularz poprawny dla " +vm.data.email);
    }else{
      $log.info("blad formularza");
      if(!$rootScope.networkStatusOnline)
        showOfflineRegistrationAlert();
    }
  }
  //anulowanie formularza
  function reset(){
    vm.data = {};
  }

  function showOfflineRegistrationAlert() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element($document[0].querySelector('#popupContainer')))
        .clickOutsideToClose(false)
        .title('Uwaga!')
        .textContent('Jesteś offline, nie możesz teraz się zarejestrować.')
        .ariaLabel('Alert Dialog')
        .ok('Rozumiem')
    );
  }
}
})();
