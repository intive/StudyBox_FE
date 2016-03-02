(function() {
  'use strict';

angular
    .module('studyBoxFe')
    .controller("RegistrationController", RegistrationController);

  function RegistrationController() {
    var vm = this;
    vm.submit = submit;
    vm.message = "";

    vm.user = {
      nick: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    function submit(isValid) {
      if (isValid) {
        //testowa informacja potwierdzajaca walidacje formularza
        vm.message = "wysłano " + vm.user.nick;
      } else {
        vm.message = "wymagana poprawa niektórych pól";
      }
    }
  }
})();
