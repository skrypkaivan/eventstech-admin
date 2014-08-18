'use strict';

angular.module('itytApp').controller('PageCtrl', ['$scope', '$location', 'Page', 'AuthenticationService',
  function ($scope, $location, Page, AuthenticationService) {

    $scope.Page = Page;

    $scope.logout = function() {
      AuthenticationService.logout();
    };
  }]);
