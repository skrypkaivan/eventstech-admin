'use strict';

angular.module('itytApp').controller('SpeakersCtrl',
  ['$scope', '$routeParams', 'CategoriesData', 'SpeakersData', 'CategoryEditModal', 'ConfirmationWindow', 'Speakers', 'Page', 'Constants',
  function ($scope, $routeParams, CategoriesData, SpeakersData, CategoryEditModal, ConfirmationWindow, Speakers, Page, Constants) {

    //ToDO: make propper errors handling
    var title = [Constants.meta.SITE_NAME, CategoriesData.error ? 'Ошибка' : 'Докладчики'];
    Page.setTitle(title.join(' - '));
    $scope.categories = CategoriesData;
    $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
    $scope.message = "";
    $scope.speakers = [];
    $scope.category = null;

    if ($routeParams.categoryId) {
      $scope.category = $scope.categories.find(function(elem) {
        if ($routeParams.categoryId === 'uncategorised'){
          return elem.slug ===  $routeParams.categoryId;
        }
        else {
          return +elem._id === +$routeParams.categoryId;
        }
      });
      if (SpeakersData.length) {
        $scope.speakers = SpeakersData;
      }
      else {
        $scope.message = "Докладчики в категории отсутствуют";
      }
    }
    else {
      $scope.message = "Выберите категорию докладчиков";
    }

    //ToDO: make propper errors handling, data to paste should come from the response
    $scope.addCategory = function() {
      CategoryEditModal.show().then(function(data) {
        Speakers.addCategory(data)
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
        Speakers.editCategory(data)
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
      ConfirmationWindow.show({
        resolve: {
          windowTitle: function() {
            return 'Удалить категорию ' + category.name + '?';
          }
        }
      }).then(function() {
        Speakers.deleteCategory(category)
          .success(function(response) {
            var index;
            if (!response.error) {
              index = $scope.categories.indexOf(category);
              if (+$scope.category._id === +category._id) {
                $scope.category = null;
                $scope.speakers = [];
                $scope.message = "Выберите категорию докладчиков";
              }
              $scope.categories.splice(index ,1);
            }
          })
          .error(function(response) {

          });
        });
    };

    //ToDO: make propper errors handling
    $scope.deleteSpeaker = function(speaker) {
      ConfirmationWindow.show({
        resolve: {
          windowTitle: function() {
            return 'Удалить докладчика ' + speaker.name + ' окончательно из всех категорий?';
          }
        }
      }).then(function() {
        Speakers.deleteSpeaker(speaker)
          .success(function(response) {
            var index;
            if (!response.error) {
              index = $scope.speakers.indexOf(speaker);
              $scope.speakers.splice(index ,1);
              if (!$scope.speakers.length) {
                $scope.message = "Докладчики в категории отсутствуют";
              }
            }
          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.deleteSpeakerFromCategory = function(speaker, category) {
      ConfirmationWindow.show({
        resolve: {
          windowTitle: function() {
            return 'Удалить докладчика ' + speaker.name + ' из категории ' + category.name + '?';
          }
        }
      }).then(function() {
        speaker.tags.find(function(elem, index) {
          if (elem._id === category._id) {
            speaker.tags.splice(index, 1);
            return true;
          }
        });
        Speakers.editSpeaker(speaker)
          .success(function(response) {
            var index;
            if (!response.error) {
              index = $scope.speakers.indexOf(speaker);
              $scope.speakers.splice(index ,1);
              if (!$scope.speakers.length) {
                $scope.message = "Докладчики в категории отсутствуют";
              }
            }
          })
          .error(function(response) {

          });
      });
    };

  }]
);
