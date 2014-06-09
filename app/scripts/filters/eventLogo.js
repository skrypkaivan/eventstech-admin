'use strict';

angular.module('itytApp').filter('eventLogo', function () {
  return function (input) {
    return 'images/event_logos/' + input;
  };
});
