(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .controller('AddCardController', AddCardController);


  /** @ngInject */
  function AddCardController($stateParams, $document, BackendService, $window, $scope) {
    var vm = this;

    vm.deckId = $stateParams.deckId;
    vm.cardId = $stateParams.cardId;

    vm.toggleStatus = false;

    vm.toggleButton = function ()
    {
      if(vm.toggleStatus === false)
        angular.element($document[0].querySelector('#hint')).css("display", "block");
      else
        angular.element($document[0].querySelector('#hint')).css("display", "none");

      vm.toggleStatus = !vm.toggleStatus;
    };

    $scope.$watch('addCard.questionFile', function(newValue, oldValue) {
      if ( newValue !== oldValue ) {

        vm.x=vm.questionFile;
        vm.previewOfImg('questionImg');
      }
    });

    vm.previewOfImg = function(fileName)
    {
      $window.alert(vm.x);

      var reader = new FileReader();


      var imgtag = $document[0].querySelector('#'+fileName);
      imgtag.title = selectedFile.name;

      reader.onload = function(onLoadEvent) {
        $scope.$apply(function() {

          $window.alert(reader.result);
        }
      )};

      readAsDataURL(vm.x)

    };
  }

})();
