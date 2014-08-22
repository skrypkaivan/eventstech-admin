'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$routeParams', '$modalInstance', 'event', 'categories', function ($scope, $routeParams, $modalInstance, event, categories) {

    //Dealing with copies of the models to restore them on cancel
    $scope.event = angular.copy(event);
    $scope.categories = angular.copy(categories);

    //If event is new and only about to be added - automatically adding current category to tags list
    if (!$scope.event.slug && $routeParams.slug !== 'uncategorised') {
      $scope.categories.find(function(elem) {
        if (elem.slug === $routeParams.slug) {
          $scope.event.tags.push(elem);
          return true;
        }
      });
    }

    //For just in case searching and removing "Uncategorized" category
    $scope.categories.find(function(elem, index) {
      if (!elem.slug) {
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

    $scope.setForm = function(form) {
      $scope.form = form;
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
      if($scope.form.$valid) {
        $modalInstance.close($scope.event);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }]);
