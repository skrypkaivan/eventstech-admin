'use strict';

angular.module('itytApp').service('Speakers', ['$http', 'Constants', function Events($http, Constants) {

  var speakersFactory = {};

  speakersFactory.getAll = function() {
    var response = {};
    return $http.get(Constants.urls.dataSpeakersUrl)
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
    return $http.get(Constants.urls.dataSpeakersCategories)
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
    return $http.get(Constants.urls.dataSpeakersUrl)
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

  speakersFactory.deleteSpeaker = function(data) {
    var response = $http.delete(Constants.urls.speakerMaintainanceURL, data);
    return response;
  };

  speakersFactory.addSpeaker = function(data) {
    var response = $http.put(Constants.urls.speakerMaintainanceURL, data);
    return response;
  };

  speakersFactory.editSpeaker = function(data) {
    var response = $http.post(Constants.urls.speakerMaintainanceURL, data);
    return response;
  };

  return speakersFactory;

}]).factory("SpeakerCategory", ["$resource", function($resource) {
    return $resource("api/speakers_tag/:tagId", {}, {
        create: {method: "PUT", isArray: false}
    })
}]);
