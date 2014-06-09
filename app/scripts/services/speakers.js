'use strict';

angular.module('itytApp').service('Speakers', ['$http', function Events($http) {
  var dataSpeakersUrl = 'mock_data/dataSpeakers.json',
      dataSpeakersCategories = 'mock_data/dataSpeakersCategories.json',
      speakersFactory = {};

  speakersFactory.getAll = function() {
    var response = {};
    return $http.get(dataSpeakersUrl)
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

  speakersFactory.getCategories = function() {
    var response = {};
    return $http.get(dataSpeakersCategories)
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

  speakersFactory.getByCategory = function(name) {
    var response = {};
    return $http.get(dataSpeakersUrl)
      .success(function(data) {
        response = data.filter(function(elem) {
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

  return speakersFactory;

}]);
