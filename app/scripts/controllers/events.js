'use strict';

angular.module('itytApp').controller('EventsCtrl', ['$scope', 'Page', 'Constants', 'categories', 'events', function ($scope, Page, Constants, categories, events) {
  //ToDO: make propper errors handling
  var title = [Constants.meta.SITE_NAME, categories.error ? 'Ошибка' : 'События'];
  Page.setTitle(title.join(' - '));
  $scope.categories = categories;
  $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
  if (events.category) {
    $scope.category = $scope.categories.find(function(elem) {
      return elem.slug === events.category;
    });

    $scope.events = events.data;

    $scope.message = "События в категории отсутствуют";

  }
  else {
    $scope.message = "Выберите категорию событий";
  }

}]);
