'use strict';

angular.module('itytApp').filter('eventDate', ['Constants', function (Constants) {
  return function (input) {
    var dateParts = input.split(" "),
        startDate = new Date(+dateParts[0]),
        endDate = new Date(+dateParts[1]),
        result = [
          startDate.getDate(),
          Constants.monthNames[startDate.getMonth()],
          ('0' + startDate.getHours()).slice(-2) + ":" + ('0' + startDate.getMinutes()).slice(-2)
        ].join(" ");

    return result;
  };
}]);
