(function() {
    var app = angular.module('pagination', []);
        app.directive('pagination', function() {
            return {
                restrict: 'A',
                templateUrl: '../paginator/js/libs/paginator/templates/pagination.html',
                scope: false,
                replace: true,
                controller: ['$scope', function($scope) {
                    $scope.async = $scope.async || false;

                    setWatchers = function() {
                        $scope.$watch('currentPage', function() {
                            $scope.pagesCount = Math.ceil($scope.paginationData.length/$scope.perPage);
                            $scope.data = $scope.paginationData.slice((($scope.currentPage-1) * $scope.perPage),($scope.currentPage * $scope.perPage));
                            getPages();
                        });

                        $scope.$watch('perPage', function() {
                            $scope.perPage = parseInt($scope.perPage) || 1;
                            if ($scope.perPage > $scope.paginationData.length) {$scope.perPage = $scope.paginationData.length;}
                            $scope.pagesCount = Math.ceil($scope.paginationData.length/$scope.perPage);
                            if ($scope.currentPage > $scope.pagesCount) {
                                $scope.currentPage = $scope.pagesCount;
                            }
                            $scope.data = $scope.paginationData.slice((($scope.currentPage-1) * $scope.perPage),($scope.currentPage * $scope.perPage));
                            getPages();
                        });
                    };

                    if ($scope.async) {
                        $scope.paginationData.then(function(data) {
                            $scope.paginationData = data;
                            setWatchers();
                        });
                    }
                    else {
                        setWatchers();
                    }

                    getPages = function() {
                        var pages = [];
                        var range = getRange($scope.currentPage);
                        var flag = false;
                        for (var i=1; i<=$scope.pagesCount; i++) {
                            if(i==1 || in_array(i, range) || i==$scope.pagesCount ) {
                                pages.push({'title': i});
                                flag = false;
                            }
                            else {
                                if (!flag) {
                                    pages.push({'title': '...', 'class': 'disabled'});
                                    flag = true;
                                }
                            }
                        }
                        $scope.pages = pages;
                    };
                    in_array = function(value, arr) {
                        for (var i=0; i<arr.length; i++) {
                            if (arr[i] == value) {
                                return true;
                            }
                        }
                        return false;
                    };
                    getRange = function(num) {
                        var result = [];
                        for( var i=num-2; i<= num+2; i++) {
                            if ( i >= 1 ) {
                                result.push(i);
                            }
                        }
                        return result;
                    };
                    $scope.changePage = function(page) {
                        if ( page == 'prev' ) {
                            $scope.currentPage = $scope.currentPage-1 > 1 ? $scope.currentPage-1 : 1;
                        }
                        else if ( page == 'next' ) {
                            $scope.currentPage = $scope.currentPage+1 > $scope.pagesCount ? $scope.pagesCount : $scope.currentPage+1;
                        }
                        else if ( isNaN(parseInt(page.title)) ) {
                            return false;
                        }
                        else {
                            page = page.title;
                            page = (page < 1 ? 1 : page) > $scope.pagesCount ? $scope.pagesCount : page;
                            $scope.currentPage = page;
                        }
                    };
                }]
            }
        });
})();
