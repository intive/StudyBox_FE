(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $state, $window, $document) {
    var vm = this;
    vm.id = $stateParams.id;

    vm.getDecks = function () {
      //service will be used in future

      return[
        {id: 0, name: 'deck_0'},
        {id: 12, name: 'deck_1'},
        {id: 23, name: 'deck_2'},
        {id: 34, name: 'deck_3'}];
    };

    vm.categories = vm.getDecks();

    var toggleStatus = true;

    vm.toggleButton = function ()
    {
      if(toggleStatus === true)
      {
        $document.getElementById("addButton").innerHTML = "remove_circle";
        $document.getElementById("hiddenIcon").innerHTML = "remove";
        $document.getElementById("hint").style.display = "block";

        toggleStatus = false;
      }
      else
      {
        $document.getElementById("addButton").innerHTML = "add_circle";
        $document.getElementById("hiddenIcon").innerHTML = "add";
        $document.getElementById("hint").style.display = "none";

        toggleStatus = true;
      }

    };

  }

})();
