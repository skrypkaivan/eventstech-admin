'use strict';

angular.module('itytApp').controller('SpeakersCtrl',
  ['$scope', 'CategoryEditModal', 'Page', 'Constants', 'categories', 'speakers', function ($scope, CategoryEditModal, Page, Constants, categories, speakers) {

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
