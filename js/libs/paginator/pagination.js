(function() {
    var app = angular.module('pagination', []);
        app.directive('pagination', function() {
            return {
                restrict: 'A',
                templateUrl: '../paginator/js/libs/paginator/templates/pagination.html',
                scope: false,
                replace: true,
                controller: ['$scope', function($scope) {


                    var currentPage = $scope.currentPage;
                    var perPage = $scope.perPage;
                    var pagesCount = Math.ceil($scope.data.length/perPage);

                    $scope.pagesTotal = pagesCount;
                    $scope.data = $scope.data.slice(((currentPage-1) * perPage),(currentPage * perPage));
                    var pages = [];
                    if ( pagesCount > 5 ) {
                        if ( currentPage < pagesCount-1 ) {
                            if ( currentPage == 1 ) {
                                pages = ['«', 1, 2, '...', pagesCount, '»'];
                            }
                            else if ( currentPage == 2 ) {
                                pages = ['«', 1, 2, '...', pagesCount, '»'];
                            }
                            else if ( currentPage == pagesCount-1 ) {
                                pages = ['«', 1, '...', currentPage, pagesCount, '»'];
                            }
                            else {
                                pages = ['«', 1, '..', currentPage, '...', pagesCount, '»'];
                            }
                        }
                        else {
                            pages = ['«', 1, '..', pagesCount-1, pagesCount, '»'];
                        }

                    }
                    else {
                        pages.push('«');
                        for (var i=1; i<=pagesCount; i++) {
                            pages.push(i);
                        }
                        pages.push('»')
                    }
                    $scope.pages = pages;
                }]
            }
        });
})();
