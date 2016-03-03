(function() {
    'use strict';
    angular
        .module('backend')
        .service('BackendService', BackendService);

    function BackendService($http) {

        this.Deck = function(name) {
            this.id = null;
            this.name = name;

            this.createFlashcard = createFlashcard;
            this.updateFlashcard = updateFlashcard;
            this.removeFlashcard = removeFlashcard;
            this.changeName = changeName;

            this.returnPromise = returnPromise;

            function createFlashcard(id, question, answer) {
                var method = 'PUT';
                var url = "http://localhost/fake";
                var data = {id: id, question: question, answer: answer};

                return returnPromise(method, url, data);
            }

            function returnPromise(method, url, data) {
                return $http({
                    method: method,
                    url: url,
                    data: data})
                    .then(
                        function success(response) {
                            return response.data;
                        },
                        function error(response) {
                            return response;
                    });
            }

            function updateFlashcard(id, question, answer) {
                var url = "http://localhost/fake";
                var data = {id: id, question: question, answer: answer};

                return returnPromise('PUT', url, data);
            }

            function removeFlashcard(id) {
                var url = id;
                url = "http://localhost/fake";

                return returnPromise('DELETE', url, {});
            }

            function changeName(new_name) {
                var url = "http://localhost/fake";
                /*jshint validthis:true */
                var data = {id: this.id, name: new_name};

                return returnPromise('PUT', url, data);
            }
        };
    }

})();
