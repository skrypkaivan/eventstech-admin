'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$modalInstance', 'event', 'categories', function ($scope, $modalInstance, event, categories) {

    //For just in case searching and removing "Uncategorized" category
    categories.find(function(elem, index) {
      if (!elem._id) {
        categories.splice(index, 1);
        return true;
      }
    });

    $scope.event = event;
    $scope.categories = categories;

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
