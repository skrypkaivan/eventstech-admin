'use strict';

angular.module('itytApp').service('Events', ['$resource','$http', 'Constants', function Events($resource, $http, Constants) {

  var eventsFactory = {};

  eventsFactory.getAll = function() {
    var response = {};
    return $http.get(Constants.urls.dataEventsUrl)
      .success(function(data) {
        response = data;
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  };

  //ToDo: remove front-end selection
  eventsFactory.getByCategory = function(id) {
    var response = {};
    return $http.get(Constants.urls.dataEventsUrl)
      .success(function(data) {
        response = data.filter(function(elem) {
          if (id === 'uncategorised') {
            return elem.tags.length === 0;
          }
          else {
            return elem.tags.find(function(tag) {
              return +tag._id === +id;
            });
          }
        });
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  };

  eventsFactory.deleteEvent = function(data) {
    var response = $http.delete(Constants.urls.eventMaintainanceURL, data);
    return response;
  };

  eventsFactory.addEvent = function(data) {
    var response = $http.put(Constants.urls.eventMaintainanceURL, data);
    return response;
  };

  eventsFactory.editEvent = function(data) {
    var response = $http.post(Constants.urls.eventMaintainanceURL, data);
    return response;
  };

  return eventsFactory;

}]).factory("EventCategory", ['$resource', function($resource) {
    return $resource("api/events_tag/:tagId",{}, {
        create: {method: "PUT", isArray: false}
    });
}]);
