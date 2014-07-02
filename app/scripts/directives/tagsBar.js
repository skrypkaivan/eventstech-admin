'use strict';

angular.module('itytApp').directive('tagsBar', function () {
  return {
    templateUrl: 'views/tagsBar.html',
    replace: 'true',
    restrict: 'E',
    scope: {
      data: '=',
      fullcollection: '='
    },
    controller: function($scope, $element) {

      $scope.removeCategory = function(tag) {
        $scope.data.find(function(elem, index) {
          if (elem._id === tag._id) {
            $scope.data.splice(index, 1);
            return true;
          }
        });
      };

      $scope.addCategory = function(category) {

        var isPresent = false, categoryToAdd;

        if (!category) {
          return;
        }

        categoryToAdd = {
          _id: category.originalObject._id,
          name: category.originalObject.name,
          slug: category.originalObject.slug
        };

        isPresent = $scope.data.find(function(elem) {
          if (+elem._id === +categoryToAdd._id) {
            return true;
          }
        });

        !isPresent && $scope.data.push(categoryToAdd);
        $element.find('#event-tags-autocomplete input').val('');

      };

    },
    link: function($scope, element) {
      element.removeAttr('data').removeAttr('fullcollection');
    }
  };
});
