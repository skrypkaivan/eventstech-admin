'use strict';

angular.module('itytApp').service('ConfirmationWindow', ['$modal', function ($modal) {

  var modalDefaults = {
    templateUrl: "partials/confirmationWindow.html",
    size: "sm",
    controller: "ConfirmationWindowInstanceCtrl",
    windowClass: "modal-centered modal-confirmation",
    resolve: {
      windowTitle: function() {
        return '';
      }
    }
  };

  this.show = function (customModalDefaults) {
    var tempModalDefaults = {};
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
    return $modal.open(tempModalDefaults).result;
  };

}]);
