(function() {
  'use strict';

  angular
    .module('studyBoxFe')
    .service('DeckService', ['$http', function ($http) {
      return {
        getDeck: function (id) {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks/'+id
          };
          return $http(req);
        },
        getDecks: function () {
          var req = {
            method: 'GET',
            url: 'http://private-anon-a4b75f333-studybox.apiary-mock.com/decks'
          };
          return $http(req);
        }
      }
    }])

})();
