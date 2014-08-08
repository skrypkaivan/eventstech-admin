'use strict';

angular.module('itytApp').controller('LoginCtrl', ['$scope', 'Page', 'Constants', 'AuthenticationService', '$location',
  function($scope, Page, Constants, AuthenticationService, $location) {

    var title = [Constants.meta.SITE_NAME, 'Авторизация'];
    Page.setTitle(title.join(' - '));

    $scope.credentials = {
      login: '',
      password: ''
    };

    $scope.message = "";

    $scope.login = function (credentials) {
      AuthenticationService.login(credentials)
        .then(function() {
          $location.path('/');
        },
        function() {
          $scope.message = "Ошибка авторизации";
        });
    };

  }
]);