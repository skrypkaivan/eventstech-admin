'use strict';

angular.module('itytApp').service('Events', ['$http', function Events($http) {

  var dataEventsUrl = 'mock_data/dataEvents.json',
      dataEventsCategories = 'mock_data/dataEventsCategories.json',
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

  eventsFactory.getByCategory = function(name) {
    var response = {};
    return $http.get(dataEventsUrl)
      .success(function(data) {
        response = data.filter(function(elem) {
          if (name == 'uncategorised') {
            return elem.tags.length == 0;
          }
          else {
            return elem.tags.find(function(tag) {
              return tag.slug === name;
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

  return eventsFactory;

}]);
