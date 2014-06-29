'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$modalInstance', 'event', function ($scope, $modalInstance, event) {

    $scope.event = event;

    $scope.tinymceOptions = {
      menubar: "false",
      width: 568,
      toolbar_items_size: 'small',
      toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code media",
      plugins: [
        "advlist autolink anchor link image lists code media"
      ]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.event);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }]);
