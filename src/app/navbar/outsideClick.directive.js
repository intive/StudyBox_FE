(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .directive('outsideClick', outsideClick);

  /** @ngInject */
  function outsideClick($document) {
return {
  restrict:'E',

                link: function (scope, element) {
                    $document.on("click", function () {
                        if(event.target.id != 'searchButton'){
                          if(event.target.id != 'searchButton2'){
                            if(event.target.id != 'searchButton3'){
                         angular.element($document[0].querySelector('#searchAutocomplete')).removeClass('showUp');
                         angular.element($document[0].querySelector('#searchAutocomplete')).addClass('searchForm');
                         angular.element($document[0].querySelector('#searchButton2')).removeClass('ng-hide');
                         angular.element($document[0].querySelector('#searchButton3')).addClass('ng-hide');
                         angular.element($document[0].querySelector('#searchButton')).removeClass('darkButton');
                       }
                       }
                        }
                    });

                  element.on("click", function (evt) {

                    evt.stopPropagation();

                  })

                   var mdv = angular.element(document).find("md-virtual-repeat-container");

                  mdv.on("click", function (evt) {

                    evt.stopPropagation();

                  })


                }

}

}
})();
