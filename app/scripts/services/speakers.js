'use strict';

angular.module('itytApp').service('Speakers', ['$http', function Events($http) {
  var dataSpeakersUrl = 'mock_data/dataSpeakers.json',
      dataSpeakersCategories = 'mock_data/dataSpeakersCategories.json',
      categoryMaintainanceURL = 'speakers/categories',
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

  //ToDo: remove front-end selection
  speakersFactory.getByCategory = function(id) {
    var response = {};
    return $http.get(dataSpeakersUrl)
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

  speakersFactory.addCategory = function(data) {
    var response = $http.put(categoryMaintainanceURL, data);
    return response;
  };

  speakersFactory.editCategory = function(data) {
    var response = $http.post(categoryMaintainanceURL, data);
    return response;
  };

  speakersFactory.deleteCategory = function(data) {
    var response = $http.delete(categoryMaintainanceURL, data);
    return response;
  };

  return speakersFactory;

}]);
