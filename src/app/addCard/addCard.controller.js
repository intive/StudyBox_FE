(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($document) {
    var vm = this;

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
        angular.element($document[0].querySelector('#addButton')).text("remove_circle");
        angular.element($document[0].querySelector('#hiddenIcon')).text("remove");
        angular.element($document[0].querySelector('#hint')).css("display", "block");

        toggleStatus = false;
      }
      else
      {
        angular.element($document[0].querySelector('#addButton')).text("add_circle");
        angular.element($document[0].querySelector('#hiddenIcon')).text("add");
        angular.element($document[0].querySelector('#hint')).css("display", "none");

        toggleStatus = true;
      }

    };

  }

})();
