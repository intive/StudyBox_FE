(function() {
  'use strict';

angular
.module('studyBoxFe')
.controller('LandingController', LandingController);


function LandingController() {
  var vm = this;
  vm.imagePath = "assets/images/StudyBoxLogo_xx.png";
  vm.loginLink = "#/login";
  vm.registrationLink = "#/registration";

}
})();
