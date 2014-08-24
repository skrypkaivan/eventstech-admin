'use strict';

angular.module('itytApp').controller('SpeakerEditModalInstanceCtrl',
  ['$scope', '$routeParams', '$modalInstance', 'speaker', 'categories','Constants', function ($scope, $routeParams, $modalInstance, speaker, categories, Constants) {

    //Dealing with copies of the models to restore them on cancel
    $scope.speaker = angular.copy(speaker);
    $scope.categories = angular.copy(categories);

    //If speaker is new and only about to be added - automatically adding current category to tags list
    if (!$scope.speaker._id && $routeParams.categoryId !== 'uncategorised') {
      $scope.categories.find(function(elem) {
        if (elem.slug === $routeParams.slug) {
          $scope.speaker.tags.push(elem);
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
      $scope.speaker.photo = newSrc;
    };

    $scope.ok = function () {
      if($scope.form.$valid) {
        $modalInstance.close($scope.speaker);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.tagsUrl = function() {
      return Constants.urls.speakerCategorySearchURL;
    }
}]);
