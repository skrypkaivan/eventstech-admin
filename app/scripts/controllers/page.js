'use strict';

angular.module('itytApp').controller('PageCtrl', ['$scope', '$location', 'Page', function ($scope, $location, Page) {

  $scope.Page = Page;

}]);
