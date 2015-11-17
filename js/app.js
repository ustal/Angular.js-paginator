(function() {
    var app = angular.module('demo', ['pagination'])
        .factory('getData', function () {
            return [
                {'name': 'Name1'},
                {'name': 'Name2'},
                {'name': 'Name3'},
                {'name': 'Name4'},
                {'name': 'Name5'},
                {'name': 'Name6'},
                {'name': 'Name7'},
                {'name': 'Name8'},
                {'name': 'Name9'},
                {'name': 'Name10'}
            ]
        })
        .factory('getDataJson', function($http, $q) {
            var deferred = $q.defer();
            $http.jsonp('http://angular.js/paginator/data.json').success(function(data) {
                deferred.resolve(data);
            }).error(function(reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        })
        .controller('demoController', ['$scope', 'getData',  function ($scope, data) {
            // для пагинатора надо заполнить след данные
            $scope.perPage = 1;
            $scope.data = data;
            $scope.currentPage = 1;
        }]);
})();
