'use strict';

angular.module('itytApp').service('EventEditModal', ['$modal', function($modal) {

  var startDate = new Date(),
      endDate, modalDefaults;

  startDate.setHours(10);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate = startDate.getTime();
  endDate = startDate + 3*3600*1000;
  modalDefaults = {
    templateUrl: "views/eventEditModal.html",
    controller: "EventEditModalInstanceCtrl",
    size: "lg",
    windowClass: "modal-centered",
    resolve: {
      event: function() {
        return {
          startdate: startDate,
          enddate: endDate
        };
      }
    }
  };


  this.show = function (customModalDefaults) {
    var tempModalDefaults = {}, modal;
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
    modal = $modal.open(tempModalDefaults);
    return modal.result;
  };

}]);
