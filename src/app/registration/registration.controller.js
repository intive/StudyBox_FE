(function() {
  'use strict';

angular
.module('studyBoxFe')
.controller('RegistrationController', RegistrationController);


function RegistrationController($log, $mdDialog) {
  var vm = this;
  vm.formStatus = '';
  vm.submit = submit;
  vm.reset = reset;
  vm.showAlert = showAlert;
  vm.data = {};
  vm.imagePath = "assets/images/StudyBoxLogo_xx.png";

  //wysylanie formularza
  function submit(isValid) {
    if (isValid) {
      vm.formStatus = "Formularz poprawny";
      $log.info("formularz poprawny dla" +vm.data.email+".");
    }else{
      vm.formStatus = "Formularz niepoprawny";
      $log.info("blad formularza");
    }
  }
  //anulowanie formularza
  function reset(){
    vm.data = {};
  }

  function showAlert(ev, online) {
    if(!online){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Uwaga!')
          .textContent('Utraciłeś połączenie z internetem, twoja rejestracja się nie powiodła. Spróbuj później.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Rozumiem')
          .targetEvent(ev)
      );
    }
  }
}
})();
