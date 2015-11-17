(function() {
    var app = angular.module('pagination', []);
        app.directive('pagination', function() {
            return {
                restrict: 'A',
                templateUrl: '../paginator/js/libs/paginator/templates/pagination.html',
                scope: false,
                replace: true,
                controller: ['$scope', function($scope) {

                    $scope.$watch('currentPage', function() {
                        $scope.pagesCount = Math.ceil($scope.paginationData.length/$scope.perPage);
                        $scope.data = $scope.paginationData.slice((($scope.currentPage-1) * $scope.perPage),($scope.currentPage * $scope.perPage));
                        $scope.getPages();
                    });

                    $scope.$watch('perPage', function() {
                        $scope.perPage = parseInt($scope.perPage) || 1;
                        if ($scope.perPage > $scope.paginationData.length) {$scope.perPage = $scope.paginationData.length;}
                        $scope.pagesCount = Math.ceil($scope.paginationData.length/$scope.perPage);
                        $scope.data = $scope.paginationData.slice((($scope.currentPage-1) * $scope.perPage),($scope.currentPage * $scope.perPage));
                        $scope.getPages();
                    });

                    $scope.currentPage = parseInt($scope.currentPage);


                    $scope.data = $scope.paginationData.slice((($scope.currentPage-1) * $scope.perPage),($scope.currentPage * $scope.perPage));

                    $scope.getPages = function() {
                        var pages = [];
                        if ( $scope.pagesCount > 5 ) {
                            if ( $scope.currentPage < $scope.pagesCount-1 ) {
                                if ( $scope.currentPage == 1 ) {
                                    pages = [1, 2, '...', $scope.pagesCount];
                                }
                                else if ( $scope.currentPage == 2 ) {
                                    pages = [1, 2, '...', $scope.pagesCount];
                                }
                                else if ( $scope.currentPage == $scope.pagesCount-1 ) {
                                    pages = [1, '...', $scope.currentPage, $scope.pagesCount];
                                }
                                else {
                                    pages = [1, '..', $scope.currentPage, '...', $scope.pagesCount];
                                }
                            }
                            else {
                                pages = [1, '..', $scope.pagesCount-1, $scope.pagesCount];
                            }

                        }
                        else {
                            for (var i=1; i<=$scope.pagesCount; i++) {
                                pages.push(i);
                            }
                        }
                        $scope.pages = pages;
                    };

                    var pages = [];
                    if ( $scope.pagesCount > 5 ) {
                        if ( $scope.currentPage < $scope.pagesCount-1 ) {
                            if ( $scope.currentPage == 1 ) {
                                pages = [1, 2, '...', $scope.pagesCount];
                            }
                            else if ( $scope.currentPage == 2 ) {
                                pages = [1, 2, '...', $scope.pagesCount];
                            }
                            else if ( $scope.currentPage == $scope.pagesCount-1 ) {
                                pages = [1, '...', $scope.currentPage, $scope.pagesCount];
                            }
                            else {
                                pages = [1, '..', $scope.currentPage, '...', $scope.pagesCount];
                            }
                        }
                        else {
                            pages = [1, '..', $scope.pagesCount-1, $scope.pagesCount];
                        }

                    }
                    else {
                        for (var i=1; i<=$scope.pagesCount; i++) {
                            pages.push(i);
                        }
                    }
                    $scope.pages = pages;
                    $scope.changePage = function(page) {
                        if ( page == 'prev' ) {
                            $scope.currentPage--;
                            if ($scope.currentPage < 1) {$scope.currentPage = 1;}
                        }
                        else if ( page == 'next' ) {
                            $scope.currentPage++;
                            if ($scope.currentPage > $scope.pagesCount) {$scope.currentPage = $scope.pagesCount;}
                        }
                        else {
                            page = parseInt(page);
                            if ( page != 0 ) {
                                $scope.currentPage = page;
                            }
                        }
                    }
                }]
            }
        });
})();
