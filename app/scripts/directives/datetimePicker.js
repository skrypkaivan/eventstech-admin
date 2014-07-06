'use strict';

angular.module('itytApp').directive('datetimePicker', [function() {
  return {
    restrict: "E",
    templateUrl: "views/dateTimepicker.html",
    replace: true,
    scope: {
      timestamp: '=',
      callback: '&'
    },
    controller: function($scope) {
      $scope.date = new Date($scope.timestamp);
      $scope.opened = false;
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

      $scope.onChanged = function(date) {
        $scope.timestamp = (new Date(date)).getTime();
        $scope.callback()($scope.timestamp);
      };
    }
  };
}]);