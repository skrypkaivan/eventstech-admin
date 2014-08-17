'use strict';

angular.module('itytApp').directive('accessLevel', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var prevDisp = element.css('display');
        $rootScope.$watch('user.userRoles', function(userRoles) {
          var acceptedRoles = attrs.accessLevel.split(",");
          if(_.intersection(acceptedRoles, userRoles).length == 0) {
            element.css('display', 'none');
          }
          else {
            element.css('display', prevDisp);
          }
        });
      }
    };
  }]);