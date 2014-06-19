'use strict';

angular.module('itytApp').service('Events', ['$http', '$httpBackend', function Events($http, $httpBackend) {

  var dataEventsUrl = 'mock_data/dataEvents.json',
      dataEventsCategories = 'mock_data/dataEventsCategories.json',
      categoryMaintainanceURL = 'events/categories',
      eventMaintainanceURL = 'events',
      eventsFactory = {};

  eventsFactory.getAll = function() {
    var response = {};
    return $http.get(dataEventsUrl)
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

  eventsFactory.getCategories = function() {
    var response = {};
    return $http.get(dataEventsCategories)
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
    return $http.get(dataEventsUrl)
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

  eventsFactory.addCategory = function(data) {
    var response = $http.put(categoryMaintainanceURL, data);
    return response;
  };

  eventsFactory.editCategory = function(data) {
    var response = $http.post(categoryMaintainanceURL, data);
    return response;
  };

  eventsFactory.deleteCategory = function(data) {
    var response = $http.delete(categoryMaintainanceURL, data);
    return response;
  };

  eventsFactory.deleteEvent = function(data) {
    var response = $http.delete(eventMaintainanceURL, data);
    return response;
  };

  return eventsFactory;

}]);
