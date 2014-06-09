'use strict';

angular.module('itytApp').controller('EventsCtrl', ['$scope', 'Page', 'Constants', 'categories', function ($scope, Page, Constants, categories) {
  //ToDO: make propper errors handling
  var title = [Constants.meta.SITE_NAME, categories.error ? 'Ошибка' : 'События'];
  Page.setTitle(title.join(' - '));
  $scope.categories = categories;

}]);
