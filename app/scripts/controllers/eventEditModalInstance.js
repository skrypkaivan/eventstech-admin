'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$modalInstance', 'event', function ($scope, $modalInstance, event) {

    $scope.event = event;

    $scope.ok = function () {
      $modalInstance.close($scope.event);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }]);
