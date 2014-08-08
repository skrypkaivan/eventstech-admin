'use strict';

angular.module('itytApp').service('CategoryEditModal', ['$modal', function($modal) {

  var modalDefaults = {
    templateUrl: "partials/categoryEditModal.html",
    controller: "CategoryEditModalInstanceCtrl",
    size: "sm",
    windowClass: "modal-centered",
    resolve: {
      category: function() {
        return {
          _id:  '',
          name: '',
          slug: ''
        };
      }
    }
  };

  this.show = function (customModalDefaults) {
    var tempModalDefaults = {};
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
    return $modal.open(tempModalDefaults).result;
  };

}]);
