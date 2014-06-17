'use strict';

angular.module('itytApp').service('CategoryEditModal', ['$modal', function CategoryEditModal($modal) {

  var modalDefaults = {
    templateUrl: "views/categoryEditModal.html",
    controller: "CategoryEditModalInstanceCtrl",
    size: "sm",
    windowClass: "modal-centered",
    resolve: {
      category: function() {
        return {
          name: '',
          slug: ''
        }
      }
    }
  };

  this.show = function (customModalDefaults) {
    var tempModalDefaults = {};
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
    return $modal.open(tempModalDefaults).result;
  };

}]);
