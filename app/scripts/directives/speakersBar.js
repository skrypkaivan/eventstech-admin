'use strict';

angular.module('itytApp').directive('speakersBar', ['Speaker', function(Speaker) {
  return {
    templateUrl: 'partials/speakersBar.html',
    replace: 'true',
    restrict: 'E',
    scope: {
      data: '=',
      url: '='
    },
    controller: function($scope, $element) {

      $scope.fullCollection = [];
      Speaker.query({}, function(data) {
        $scope.fullCollection = data;
      });

      $scope.removeSpeaker = function(speaker) {
        $scope.data.find(function(elem, index) {
          if (elem._id === speaker._id) {
            $scope.data.splice(index, 1);
            return true;
          }
        });
      };

      $scope.addSpeaker = function(speaker) {
        var isPresent = false, speakerToAdd;

        if (!speaker) {
          return;
        }

        speakerToAdd = {
          _id: speaker.originalObject._id,
          name: speaker.originalObject.name,
          photo: speaker.originalObject.photo
        };

        isPresent = $scope.data.find(function(elem) {
          if (elem._id === speakerToAdd._id) {
            return true;
          }
        });

        !isPresent && $scope.data.push(speakerToAdd);
        $element.find('angucomplete input').val('');
      };

    },
    link: function($scope, element) {
      element.removeAttr('data');
    }
  };
}]);