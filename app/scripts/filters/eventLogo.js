'use strict';

angular.module('itytApp').filter('eventLogo', function () {
  return function (input) {
    return input && input.indexOf('images/event_logos/') === -1 ? 'images/event_logos/' + input : input;
  };
});
