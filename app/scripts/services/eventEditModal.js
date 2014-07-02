'use strict';

angular.module('itytApp').service('EventEditModal', ['$modal', 'Events', function($modal, Events) {

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
    categories: [],
    resolve: {
      event: function() {
        return {
          startdate: startDate,
          enddate: endDate,
          tags: []
        };
      },
      categories: function(Events) {
        return Events.getCategories();
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
