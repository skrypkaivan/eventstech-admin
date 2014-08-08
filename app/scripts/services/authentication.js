'use strict';

angular.module('itytApp').service('AuthenticationService',
  ['$http', '$cookieStore', '$rootScope', function Events($http, $cookieStore, $rootScope) {

    var authService = {}, guestUserObject = { userName: '', userRole: 'guest' };

    $rootScope.user = $cookieStore.get('user') || guestUserObject;

    authService.isLoggedIn = function() {
      return $rootScope.userName && $rootScope.userRole !== 'guest';
    };

    authService.getUserRole = function() {
      return $rootScope.userRole;
    };

    authService.login = function(credentials) {
      return $http.post('/login', credentials).success(function(res) {
        $rootScope.user = res;
      });
    };

    authService.logout = function() {
      return $http.post('/logout').success(function(res) {
        $rootScope.user = guestUserObject;
      });
    };

    return authService;

  }
]);