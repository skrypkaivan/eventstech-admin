'use strict';

angular.module('itytApp').controller('SpeakersCtrl', ['$scope', 'Page', 'Constants', 'categories', 'speakers', function ($scope, Page, Constants, categories, speakers) {
  //ToDO: make propper errors handling
  var title = [Constants.meta.SITE_NAME, categories.error ? 'Ошибка' : 'Докладчики'];
  Page.setTitle(title.join(' - '));
  $scope.categories = categories;
  $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
  if (speakers.category) {
    $scope.category = $scope.categories.find(function(elem) {
      return elem.slug === speakers.category;
    });

    $scope.speakers = speakers.data;

    $scope.message = "Докладчики в категории отсутствуют";

  }
  else {
    $scope.message = "Выберите категорию докладчиков";
  }

}]);
