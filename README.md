# Angular.js-paginator
В файле приложения в контроллере указываем переменные:
$scope.perPage, $scope.currentPage, $scope.paginationData (данные, которые надо будет разбивать на страницы)

В файл шаблона кидаем в ng-repeat data. После чего добавляем тег <div pagination></div>

Пример

`index.html`
~~~
<body ng-app="demo">
<div ng-controller="demoController">
    <label>
        <input ng-model="perPage">
    </label>
    <div>{{data}}</div>
    <div pagination></div>
</div>
</body>
~~~

`app.js`
~~~
(function() {
  // включаем зависимость от директивы pagination
  var app = angular.module('demo', ['pagination']);

  app.controller('demoController', ['$scope', 'getData',  function ($scope, data) {
  // пример для данных, которые получаются ВНЕ контроллера.
    $scope.perPage = 1;
    $scope.paginationData = data;
    $scope.currentPage = 1;
  }]);
})();
~~~
