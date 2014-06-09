'use strict';

angular.module('itytApp').controller('SpeakersCtrl', ['$scope', 'Page', 'Constants', 'categories', function ($scope, Page, Constants, categories) {
  //ToDO: make propper errors handling
  var title = [Constants.meta.SITE_NAME, categories.error ? 'Ошибка' : 'Докладчики'];
  Page.setTitle(title.join(' - '));
  $scope.categories = categories;

}]);
