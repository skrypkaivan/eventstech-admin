'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$routeParams', '$modalInstance', 'event', 'categories', function ($scope, $routeParams, $modalInstance, event, categories) {

    //Dealing with copies of the models to restore them on cancel
    $scope.event = angular.copy(event);
    $scope.categories = angular.copy(categories);

    //If event is new and only about to be added - automatically adding current category to tags list
    if (!$scope.event._id && $routeParams.categoryId !== 'uncategorised') {
      $scope.categories.find(function(elem) {
        if (+elem._id === +$routeParams.categoryId) {
          $scope.event.tags.push(elem);
          return true;
        }
      });
    }

    //For just in case searching and removing "Uncategorized" category
    $scope.categories.find(function(elem, index) {
      if (!elem._id) {
        $scope.categories.splice(index, 1);
        return true;
      }
    });

    $scope.tinymceOptions = {
      menubar: "false",
      width: 568,
      toolbar_items_size: 'small',
      toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code media",
      plugins: [
        "advlist autolink anchor link image lists code media"
      ]
    };

    $scope.imageAdded = function(newSrc){
      $scope.event.logo = newSrc;
    };

    $scope.setStartDate = function(date){
      $scope.event.startdate = date;
    };

    $scope.setEndDate = function(date){
      $scope.event.enddate = date;
    };

    $scope.ok = function () {
      $modalInstance.close($scope.event);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }]);
