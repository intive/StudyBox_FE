(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $state, $window) {
    var vm = this;
    vm.id = $stateParams.id;

    var toggleStatus = true;

    vm.toggleButton = function ()
    {
      if(toggleStatus === true)
      {
        document.getElementById("addButton").innerHTML = "remove_circle";
        document.getElementById("hiddenIcon").innerHTML = "remove";
        document.getElementById("hint").style.display = "block";

        toggleStatus = false;
      }
      else
      {
        document.getElementById("addButton").innerHTML = "add_circle";
        document.getElementById("hiddenIcon").innerHTML = "add";
        document.getElementById("hint").style.display = "none";

        toggleStatus = true;
      }

    };

  }

})();
