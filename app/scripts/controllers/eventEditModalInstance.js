'use strict';

angular.module('itytApp').controller('EventEditModalInstanceCtrl',
  ['$scope', '$routeParams', '$modalInstance', 'event', 'category', 'Constants', function ($scope, $routeParams, $modalInstance, event, category, Constants) {

    //Dealing with copies of the models to restore them on cancel
    $scope.event = angular.copy(event);

    //If event is new and only about to be added - automatically adding current category to tags list
    if (!$scope.event.slug && $routeParams.slug !== Constants.common.uncategorisedCategory) {
         $scope.event.tags.push(category);
    }

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

    $scope.tagsUrl = function() {
        return Constants.urls.eventCategorySearchURL;
    };

    $scope.speakersUrl = function() {
        return Constants.urls.speakerNameOrSlugSearchURL;
    }
}]);
