'use strict';

angular.module('itytApp').controller('ConfirmationWindowInstanceCtrl',
  ['$scope', '$modalInstance', 'windowTitle', function ($scope, $modalInstance, windowTitle) {

    $scope.windowTitle = windowTitle;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }]);
