(function() {
  'use strict';

angular
.module('studyBoxFe')
.controller('RegistrationController', RegistrationController);


function RegistrationController($log) {
  var vm = this;
  vm.formStatus = '';
  vm.submit = submit;
  vm.reset = reset;
  vm.data = {};
  vm.imagePath = "assets/images/StudyBoxLogo_xx.png";

  //wysylanie formularza
  function submit(isValid) {
    if (isValid) {
        vm.formStatus = "Formularz poprawny";
        $log.info("formularz poprawny dla " +vm.data.login);
    }else{
      vm.formStatus = "Formularz niepoprawny";
      $log.info("blad formularza");
    }
  }
  //anulowanie formularza
  function reset(){
    vm.data = {};
  }
}
})();
