'use strict';

angular.module('itytApp').service('SpeakerEditModal', ['$modal', function($modal) {

  var modalDefaults = {
    templateUrl: "partials/speakerEditModal.html",
    controller: "SpeakerEditModalInstanceCtrl",
    size: "lg",
    windowClass: "modal-centered",
    categories: [],
    resolve: {
      speaker: function() {
          return {tags: []}
      },
      categories: function($q, SpeakerCategory) {
        var deferred = $q.defer();
          SpeakerCategory.query({}, function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
      }
    }
  };

  this.show = function (customModalDefaults) {
    var modalOptions = {}, modal;
    angular.extend(modalOptions, modalDefaults, customModalDefaults);
    modal = $modal.open(modalOptions);
    return modal.result;
  };
}]);
