'use strict';

angular.module('itytApp').directive('hideValidationOnNewUntillTyped', [function() {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      var value = $element.val(),
          onChange = function() {
            $element.parent().removeClass('non-typed');
          };

      if (!value) {
        $element.parent().addClass('non-typed');
        $element.off('change keypress', onChange).one('change keypress', onChange);
        $scope.$on("$destroy",function() {
          $element.off('change', onChange);
        });
      }
    }
  };
}]);