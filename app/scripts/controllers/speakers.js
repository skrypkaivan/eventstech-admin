'use strict';

angular.module('itytApp').controller('SpeakersCtrl',
  ['$scope', '$routeParams', 'CategoriesData', 'SpeakersData', 'SpeakerEditModal', 'CategoryEditModal', 'ConfirmationWindow', 'Speakers', 'Page', 'Constants',
  function ($scope, $routeParams, CategoriesData, SpeakersData, SpeakerEditModal, CategoryEditModal, ConfirmationWindow, Speakers, Page, Constants) {

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
            if (response.error) {
              return;
            }
            //Todo: remove ID - whole data should come from the server
            data._id = (new Date()).getTime();
            $scope.categories.push(data);
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
            if (response.error) {
              return;
            }
            for (i = 0, l = $scope.categories.length; i < l; i++) {
              if ($scope.categories[i]._id === data._id) {
                $scope.categories[i] = data;
                break;
              }
            }
            if ($scope.category && $scope.category._id) {
              $scope.category = data;
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
            if (response.error) {
              return;
            }
            index = $scope.categories.indexOf(category);
            if (+$scope.category._id === +category._id) {
              $scope.category = null;
              $scope.speakers = [];
              $scope.message = "Выберите категорию докладчиков";
            }
            $scope.categories.splice(index ,1);
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
            if (response.error) {
              return;
            }
            index = $scope.speakers.indexOf(speaker);
            $scope.speakers.splice(index ,1);
            if (!$scope.speakers.length) {
              $scope.message = "Докладчики в категории отсутствуют";
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
        Speakers.editSpeaker(speaker)
          .success(function(response) {

            if (response.error) {
              return;
            }

            //Modifying spearks tags
            speaker.tags.find(function(elem, index) {
              if (+elem._id === +category._id) {
                speaker.tags.splice(index, 1);
                return true;
              }
            });

            //Removing speaker from category
            $scope.speakers.splice($scope.speakers.indexOf(speaker) ,1);
            if (!$scope.speakers.length) {
              $scope.message = "Докладчики в категории отсутствуют";
            }

          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.addSpeaker = function() {
      SpeakerEditModal.show().then(function(speaker) {
        Speakers.addSpeaker(speaker)
          .success(function(response) {

            //TODO: operate with a real response - not the input data, pay also attention to image's path handling
            var isPersistenInCategory = false, data = speaker;
            if (response.error) {
              return;
            }

            //Todo: remove ID - whole data should come from the server
            data._id = (new Date()).getTime();

            isPersistenInCategory = $scope.category._id && data.tags.find(function(elem) {
              return +$scope.category._id === +elem._id;
            });
            // If added event has preserved its category (as well as still holds no tags when has been uncategorized initially) - adding it
            if ((!$scope.category._id && !data.tags.length) || isPersistenInCategory) {
              $scope.speakers.push(data);
            }

          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.editSpeaker = function(speaker) {
      SpeakerEditModal.show({
        resolve: {
          speaker: function() {
            return speaker;
          },
          categories: function() {
            return CategoriesData;
          }
        }
      }).then(function(data) {
        Speakers.editSpeaker(data)
          .success(function(response) {
            if (response.error) {
              return;
            }
            //TODO: operate with a real response - not the input data, pay also attention to image's path handling
            $scope.speakers.find(function(elem, index) {
              var isPersistenInCategory = false;
              if (+elem._id === +data._id) {
                isPersistenInCategory = $scope.category._id && data.tags.find(function(elem) {
                  return +$scope.category._id === +elem._id;
                });
                // If updated event has preserved its category (as well as still holds no tags when has been uncategorized initially) -
                // persist it, otherwise deleting it from the current category's events list
                if ((!$scope.category._id && !data.tags.length) || isPersistenInCategory) {
                  $scope.speakers[index] = data;
                }
                else {
                  $scope.speakers.splice(index, 1);
                  if (!$scope.speakers.length) {
                    $scope.message = "В результате редактирования докладчики в данной категории отсутствуют";
                  }
                }
                return;
              }
            });
          })
          .error(function(response) {

          });
      });
    };

  }]

);
