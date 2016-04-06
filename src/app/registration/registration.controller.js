(function() {
  'use strict';

angular
.module('registration')
.controller('RegistrationController', RegistrationController);

/** @ngInject */
function RegistrationController($document, $log, $window, $rootScope, $mdDialog, $translate,$http,$filter , $state) {
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
          'name': "''",
          'password': "'"+vm.data.password+"'"
        }
      }).then(function successCallback() {
        //alert(angular.toJson (response.data));
        var dialog = $mdDialog.alert({
          title: $filter('translate')('registration-DIALOG_TITLE'),
          textContent: $filter('translate')('registration-DIALOG_TEXT_CONTENT_TRUE'),
          ok: $filter('translate')('registration-DIALOG_OK')
        });
        $mdDialog
          .show( dialog )
          .finally(function() {
            dialog = undefined;
            $state.go('login');
          });
      }, function errorCallback() {
        var dialog = $mdDialog.alert({
          title: $filter('translate')('registration-DIALOG_TITLE'),
          textContent: $filter('translate')('registration-DIALOG_TEXT_CONTENT_FALSE'),
          ok: $filter('translate')('registration-DIALOG_OK')
        });
        $mdDialog
          .show( dialog )
          .finally(function() {
            dialog = undefined;
          });
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
