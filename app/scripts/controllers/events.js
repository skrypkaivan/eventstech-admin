'use strict';

angular.module('itytApp').controller('EventsCtrl',
  ['$scope', '$routeParams', '$location','CategoriesData', 'EventsData', 'CategoryEditModal', 'Events', 'Page', 'Constants',
  function ($scope, $routeParams, $location, CategoriesData, EventsData, CategoryEditModal, Events, Page, Constants) {

    //ToDO: make propper errors handling
    var title = [Constants.meta.SITE_NAME, CategoriesData.error ? 'Ошибка' : 'События'];
    Page.setTitle(title.join(' - '));
    $scope.categories = CategoriesData;
    $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
    $scope.message = "";
    $scope.events = [];

    if ($routeParams.categoryId) {
      $scope.category = $scope.categories.find(function(elem) {
        if ($routeParams.categoryId === 'uncategorised'){
          return elem.slug ===  $routeParams.categoryId;
        }
        else {
          return +elem._id === +$routeParams.categoryId;
        }
      });
      if (EventsData.length) {
        $scope.events = EventsData;
      }
      else {
        $scope.message = "События в категории отсутствуют";
      }
    }
    else {
      $scope.message = "Выберите категорию событий";
    }

    //ToDO: make propper errors handling, data to paste should come from the response
    $scope.addCategory = function() {
      CategoryEditModal.show().then(function(data) {
        Events.addCategory(data)
          .success(function(response) {
            if (!response.error) {
              //Todo: remove ID - whole data should come from the server
              data._id = (new Date()).getTime();
              $scope.categories.push(data);
            }
          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling, data to paste should come from the response
    $scope.editCategory = function(category) {
      CategoryEditModal.show({
        resolve: {
          category: function() {
            return category;
          }
        }
      }).then(function(data) {
        Events.editCategory(data)
          .success(function(response) {
            var i, l;
            if (!response.error) {
              for (i = 0, l = $scope.categories.length; i < l; i++) {
                if ($scope.categories[i]._id === data._id) {
                  $scope.categories[i] = data;
                  break;
                }
              }
              if ($scope.category && $scope.category._id) {
                $scope.category = data;
              }
            }
          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.deleteCategory = function(category) {

    };

  }]
);
