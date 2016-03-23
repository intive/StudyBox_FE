(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('LoginController', LoginController);

  function LoginController($log, $state) {
    var vm = this;
    vm.formStatus = '';
    vm.submit = submit;
    vm.imagePath = "assets/images/StudyBoxLogo_xx.png";
    vm.passwordRegex = /^[^\s]+$/;

    function submit(isValid) {
      if (isValid) {
        $log.info("Poprawne logowanie");
        $state.go("decks");
      }else{
        $log.info("błąd logowania");
      }
    }
  }
})();
