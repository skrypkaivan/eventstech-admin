'use strict';

angular.module('itytApp').filter('speakerPhoto', function () {
  return function (input) {
    return input ? 'images/speaker_photos/' + input : '';
  };
});
