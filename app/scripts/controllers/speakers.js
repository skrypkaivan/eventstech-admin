'use strict';

angular.module('itytApp').controller('SpeakersCtrl', ['$scope', 'Page', 'Constants', 'data', function ($scope, Page, Constants, data) {
  //ToDO: make propper errors handling
  var title = [Constants.meta.SITE_NAME, data.speakers ? 'Докладчики' : 'Ошибка'];
  Page.setTitle(title.join(' - '));
  $scope.speakers = data.speakers || [];

}]);
