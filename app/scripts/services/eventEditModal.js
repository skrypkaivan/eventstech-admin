'use strict';

angular.module('itytApp').service('EventEditModal', ['$modal', 'EventCategory', function($modal, EventCategory) {

  var startDate = new Date(),
      endDate, modalDefaults;

  startDate.setHours(10);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate = startDate.getTime();
  endDate = startDate + 3*3600*1000;
  modalDefaults = {
    templateUrl: "partials/eventEditModal.html",
    controller: "EventEditModalInstanceCtrl",
    size: "lg",
    windowClass: "modal-centered",
    categories: [],
    resolve: {
      event: function() {
        return {
          startdate: startDate,
          enddate: endDate,
          tags: [],
          speakers: []
        };
      },
      categories: function(EventCategory, $q) {
        var deferred = $q.defer();
        EventCategory.query({}, function(response) {
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
