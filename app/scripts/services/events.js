'use strict';

angular.module('itytApp').service('Events', ['$http', function Events($http) {

  var dataEventsUrl = 'mock_data/dataEvents.json',
      dataEventsPopularUrl = 'mock_data/dataEventsPopular.json',
      dataEventsSimilarUrl = 'mock_data/dataEventsSimilar.json',
      eventsFactory = {};

  eventsFactory.getAll = function() {
    var response = {};
    return $http.get(dataEventsUrl)
      .success(function(data) {
        response.events = data;
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  };

  eventsFactory.getEvent = function(id) {
    var response = {};
    return $http.get(dataEventsUrl)
      .success(function(data) {
        response.event = data.find(function(elem) {
          return +elem['_id'] === +id;
        });
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  }

  eventsFactory.getPopular = function() {
    var response = {};
    return $http.get(dataEventsPopularUrl)
      .success(function(data) {
        response.events = data;
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  };

  eventsFactory.getByTag = function(name) {
    var response = {};
    return $http.get(dataEventsUrl)
      .success(function(data) {
        response.events = data.filter(function(elem) {
          return elem.tags.find(function(tag) {
            return tag.slug === name;
          });
        });
      })
      .error(function(message) {
        response.error = message;
      })
      .then(function() {
        return response;
      });
  };

  eventsFactory.getSimilar = function() {
    var response = {};
    return $http.get(dataEventsSimilarUrl)
      .success(function(data) {
        response.events = data;
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
