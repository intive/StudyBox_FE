(function() {
  'use strict';

angular
.module('studyBoxFe')
.run(runMDL)
.controller('RegistrationController', RegistrationController);

function runMDL($rootScope, $timeout) {

  $rootScope.watcher = $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
          componentHandler.upgradeAllRegistered();
      }, 0);
  });
  $rootScope.render = {
      header: true,
      aside: true
  }
}

function RegistrationController($log) {
  var vm = this;
  vm.formStatus = '';
  vm.submit = submit;
  vm.data = {};

  //wysylanie formularza
  function submit(isValid) {
    if (isValid) {
        vm.formStatus = "Formularz poprawny";
        $log.info("formularz poprawny dla " +vm.data.login);
    }else{
      angular.forEach(vm.registrationForm.$error, function(field) {
          angular.forEach(field, function(errorField) {
              errorField.$setTouched();
          })
      });
      vm.formStatus = "Formularz niepoprawny";
      $log.info("blad formularza");
    }
  }
}
})();
