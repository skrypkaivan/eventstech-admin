'use strict';

angular.module('itytApp').directive('accessLevel', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var prevDisp = element.css('display');
        $rootScope.$watch('user.userRole', function(role) {
          if(attrs.accessLevel !== role) {
            element.css('display', 'none');
          }
          else {
            element.css('display', prevDisp);
          }
        });
      }
    };
  }]);