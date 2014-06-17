'use strict';

angular.module('itytApp').controller('CategoryEditModalInstanceCtrl',
  ['$scope', '$modalInstance', 'category', function ($scope, $modalInstance, category) {

    $scope.name = category.name;
    $scope.slug = category.slug;

    $scope.ok = function () {
      $modalInstance.close({name: $scope.name, slug: $scope.slug});
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

}]);
