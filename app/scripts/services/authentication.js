'use strict';

angular.module('itytApp').service('AuthenticationService',
  ['$http', '$cookieStore', '$rootScope','$location', function Events($http, $cookieStore, $rootScope, $location) {

    var authService = {}, guestUserObject = { userName: '', userRoles: 'guest' };

    $rootScope.user = $cookieStore.get('user') || guestUserObject;

    authService.isLoggedIn = function() {
      return $rootScope.user && $rootScope.user.userName && $rootScope.user.userRoles !== 'guest';
    };

    authService.getUserRole = function() {
      return $rootScope.userRole;
    };

    authService.login = function(credentials) {
      return $http({
          method:'POST',
          url: 'api/login',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param(credentials)
      }).success(function(res) {
          $cookieStore.put('user', res);
          $rootScope.user = res;
      })
    };

    authService.logout = function() {
      return $http.post('api/logout').success(function(res) {
        $cookieStore.remove("user");
        $rootScope.user = guestUserObject;
        $location.path("/login");
      });
    };

    return authService;
  }
]).factory("AuthenticationInterceptor", ['$rootScope', '$q', function($scope, $q) {
    return ["AuthenticationService", function(authService) {

        var authInterceptor = {};

        authInterceptor.response = function(response) {
            return response;
        };

        authInterceptor.responseError = function(response) {
            var status = response.status;
            if (status == 401) {
                authService.logout();
                return;
            }
            return $q.reject(response);
        };

        return authInterceptor;
    }];
}]);