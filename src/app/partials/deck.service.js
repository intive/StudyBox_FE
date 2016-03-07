(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .service('Decks', ['$http', function ($http) {
      return {
        getDeck: function (id) {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks/'+id
          };
          $http(req).then(
            function success(response) {
              console.log(response.data)
              return response.data;
            },
            function error(response) {
              return response;
            });
        },
        getDecks: function () {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks'
          };
          $http(req).then(
            function success(response) {
              console.log(response.data)
              return response.data;
            },
            function error(response) {
              return response;
            });
        }
      }
    }])

})();
