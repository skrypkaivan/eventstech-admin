'use strict';

angular.module('itytApp').filter('speakerPhoto', function () {
  return function (input) {
    return input && input.indexOf('images/speaker_photos/') === -1 ? 'images/speaker_photos/' + input : '';
  };
});
