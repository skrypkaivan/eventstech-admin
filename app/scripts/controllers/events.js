'use strict';

angular.module('itytApp').controller('EventsCtrl',
  ['$scope', 'CategoryEditModal', 'Page', 'Constants', 'categories', 'events', function ($scope, CategoryEditModal, Page, Constants, categories, events) {

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

    this.addCategory = function() {
      CategoryEditModal.show().then(function(data) {
        console.log(data);
      });
    };

    $scope.addCategory = this.addCategory;

    this.editCategory = function(category) {
      CategoryEditModal.show({
        resolve: {
          category: function() {
            return category;
          }
        }
      }).then(function(data) {
        console.log(data);
      });
    };

    $scope.editCategory = this.editCategory;

  }]
);
