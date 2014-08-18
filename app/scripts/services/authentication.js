'use strict';

angular.module('itytApp').service('AuthenticationService',
  ['$http',
   '$cookieStore',
   '$rootScope',
   '$location',
   'AUTH_EVENTS',
   "ACCEPTABLE_USER_ROLES", function($http, $cookieStore, $rootScope, $location, AUTH_EVENTS, ACCEPTABLE_USER_ROLES) {

    var authService = {},
        guestUserObject = { userName: '', userRoles: ['guest'], authToken: ""};

    $rootScope.user = $cookieStore.get('user') || guestUserObject;

    authService.isLoggedIn = function() {
      return $rootScope.user && $rootScope.user.authToken && $rootScope.user.userName && $rootScope.user.userRoles !== 'guest';
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
          if (_.intersection(res.userRoles, ACCEPTABLE_USER_ROLES).length > 0) {
              $cookieStore.put('user', res);
              $rootScope.user = res;
          }
      })
    };

    authService.logout = function() {
        $cookieStore.remove("user");
        $rootScope.user = guestUserObject;
        $location.path("/login");
    };

    $rootScope.$on(AUTH_EVENTS.NOT_AUTHORIZED, function() {
        authService.logout();
    });

    return authService;
  }
]).factory("AuthenticationInterceptor", ['$rootScope', '$q','AUTH_EVENTS', function($scope, $q, AUTH_EVENTS) {
        var authInterceptor = {};

        authInterceptor.response = function(response) {
            return response;
        };

        authInterceptor.request = function(config) {
            config.headers["X-Auth-Login"] = $scope.user.userName;
            config.headers["X-Auth-Token"] = $scope.user.authToken;
            return config;
        };

        authInterceptor.responseError = function(response) {
            var status = response.status;
            if (status == 401) {
                $scope.$broadcast(AUTH_EVENTS.NOT_AUTHORIZED);
            } else if (status == 403) {
                $scope.$broadcast(AUTH_EVENTS.FORBIDDEN);
            }
            return $q.reject(response);
        };

        return authInterceptor;
}]);