(function() {
  'use strict';

angular
.module('registration')
.controller('RegistrationController', RegistrationController);

/** @ngInject */
function RegistrationController($document, $log, $window, $rootScope, $mdDialog, $translate,$http) {
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

      $http({
        method: 'POST',
        url: '/api/users',
        data: {
          'email': "'"+vm.data.email+"'",
          'name': "'"+vm.data.email+"'",
          'password': "'"+vm.data.password+"'"
        }
      }).then(function successCallback(response) {
        alert(angular.toJson (response.data));
      }, function errorCallback(response) {
        alert('Nie działa :(');
      });

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
        .title($translate.instant('networkAlert-WARNING'))
        .textContent($translate.instant('networkAlert-OFFLINE_REGISTRATION'))
        .ariaLabel('Alert Dialog')
        .ok($translate.instant('networkAlert-AGREE'))
    );
  }
}
})();
