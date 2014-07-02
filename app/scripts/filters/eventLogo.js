'use strict';

angular.module('itytApp').filter('eventLogo', function () {
  return function (input) {
    return input ? 'images/event_logos/' + input : '';
  };
});
