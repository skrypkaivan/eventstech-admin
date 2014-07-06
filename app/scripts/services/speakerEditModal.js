'use strict';

angular.module('itytApp').service('SpeakerEditModal', ['$modal', 'Speakers', function($modal, Speakers) {

  var modalDefaults = {
    templateUrl: "views/speakerEditModal.html",
    controller: "SpeakerEditModalInstanceCtrl",
    size: "lg",
    windowClass: "modal-centered",
    categories: [],
    resolve: {
      speaker: function() {
        return {
          tags: []
        };
      },
      categories: function(Speakers) {
        return Speakers.getCategories();
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
