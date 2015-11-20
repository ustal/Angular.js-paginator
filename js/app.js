(function() {
    var app = angular.module('demo', ['pagination']);
    //var app = angular.module('demo', []);
    app.factory('getData', function () {
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
        });

    app.factory('getDataJson', ['$http', '$q', function($http, $q) {
        var deferred = $q.defer();
        $http.get('../paginator/data.json').success(function(data) {
            deferred.resolve(data);
        }).error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    }]);

    app.controller('demoController', ['$scope', 'getDataJson', function ($scope, getData) {
        // для пагинатора надо заполнить след данные
        /*
            $scope.paginationData = promise или массив данных. Будет доступен в $scope.data
            $scope.async = true/false/не указывать, если данные получают через promise (например $http.get/post)
         */
        $scope.paginationData = getData;
        $scope.async = true;
        $scope.perPage = 1;
        $scope.currentPage = 1;
            // TODO 3 варианта. Пред-След, пред-цифр-след, цифр
            // TODO выбор +-1 или +-2 страницы от текущей
            // end
        }]);
})();
