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


    function submit(isValid) {
      if (isValid) {
        vm.formStatus = "";
        $log.info("Poprawne logowanie");
        $state.go("decks");
      }else{
        vm.formStatus = "Niepoprawny login lub hasło";
        $log.info("błąd logowania");
      }
    }
  }
})();
