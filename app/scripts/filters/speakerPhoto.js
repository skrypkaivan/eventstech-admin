'use strict';

angular.module('itytApp').filter('speakerPhoto', function () {
  return function (input) {
    return 'images/speaker_photos/' + input;
  };
});
