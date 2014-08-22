'use strict';

angular.module('itytApp').controller('SpeakersCtrl',
  ['$scope',
   '$routeParams',
   'CategoriesData',
   'SpeakersData',
   'SpeakerEditModal',
   'CategoryEditModal',
   'ConfirmationWindow',
   'Page',
   'Constants',
   'SpeakerCategory',
   'Speaker',
  function ($scope, $routeParams, CategoriesData, SpeakersData, SpeakerEditModal, CategoryEditModal, ConfirmationWindow, Page, Constants, SpeakerCategory, Speaker) {

    //ToDO: make propper errors handling
    var title = [Constants.meta.SITE_NAME, CategoriesData.error ? 'Ошибка' : 'Докладчики'];
    Page.setTitle(title.join(' - '));
    $scope.categories = CategoriesData;
    $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
    $scope.message = "";
    $scope.speakers = [];
    $scope.category = null;

    if ($routeParams.slug) {
      $scope.category = $scope.categories.find(function(elem) {
        if ($routeParams.slug === 'uncategorised'){
          return elem.slug ===  $routeParams.slug;
        }
        else {
          return elem.slug === $routeParams.slug;
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
        SpeakerCategory.create(data,
            function(response) {
                $scope.categories.push(response);
            },
            function(response) {
                if (response.data.fieldErrors) {

                }
            }
        );
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
        SpeakerCategory.save(data,
            function(response) {
                for (var i = 0, l = $scope.categories.length; i < l; i++) {
                    if ($scope.categories[i]._id === data._id) {
                        $scope.categories[i] = data;
                        break;
                    }
                }
                if ($scope.category && $scope.category._id) {
                    $scope.category = data;
                }
            },
            function(response) {
                if (response.data.fieldErrors) {

                }
            }
        );
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
        SpeakerCategory.delete({tagId:category._id},
            function(response) {
                var index = $scope.categories.indexOf(category);
                if (+$scope.category._id === +category._id) {
                    $scope.category = null;
                    $scope.speakers = [];
                    $scope.message = "Выберите категорию докладчиков";
                }
                $scope.categories.splice(index ,1);
            },
            function(response){
                if (response.data.fieldErrors) {

                }
            }
        );
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
        Speaker.delete({slug:speaker._id},
          function(response) {
            index = $scope.speakers.indexOf(speaker);
            $scope.speakers.splice(index ,1);
            if (!$scope.speakers.length) {
              $scope.message = "Докладчики в категории отсутствуют";
            }
          },
          function(response) {

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
        //Modifying spearks tags
        speaker.tags.find(function(elem, index) {
          if (elem._id === category._id) {
              speaker.tags.splice(index, 1);
              return true;
        }});
        Speaker.save(speaker, function(response) {
            //Removing speaker from category
            $scope.speakers.splice($scope.speakers.indexOf(speaker) ,1);
            if (!$scope.speakers.length) {
              $scope.message = "Докладчики в категории отсутствуют";
            }
          },
          function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.addSpeaker = function() {
      SpeakerEditModal.show().then(function(speaker) {
        Speaker.create(speaker, function(response) {
            var isPersistedInCategory = false, data = response;

            isPersistedInCategory = $scope.category.slug && response.tags.find(function(elem) {
              return $scope.category.slug === elem.slug;
            });

            // If added event has preserved its category (as well as still holds no tags when has been uncategorized initially) - adding it
            if ((!$scope.category.slug && !response.tags.length) || isPersistedInCategory) {
              $scope.speakers.push(response);
            }
          },
          function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.editSpeaker = function(speaker) {
      SpeakerEditModal.show({
        resolve: {
          speaker: function($q, Speaker) {
            var deferred = $q.defer();
            Speaker.get({slug:speaker.slug}, function(response) {
               deferred.resolve(response);
            });
            return deferred.promise;
          },
          categories: function() {
            return CategoriesData;
          }
        }
      }).then(function(data) {
        Speaker.save(data,  function(response) {
            //TODO: operate with a real response - not the input data, pay also attention to image's path handling
            $scope.speakers.find(function(elem, index) {
              var isPersistedInCategory = false;
              if (elem.slug === response.slug) {
                isPersistedInCategory = $scope.category.slug && response.tags.find(function(elem) {
                  return $scope.category.slug === elem.slug;
                });
                // If updated event has preserved its category (as well as still holds no tags when has been uncategorized initially) -
                // persist it, otherwise deleting it from the current category's events list
                if ((!$scope.category.slug && !response.tags.length) || isPersistedInCategory) {
                  $scope.speakers[index] = response;
                }
                else {
                  $scope.speakers.splice(index, 1);
                  if (!$scope.speakers.length) {
                    $scope.message = "В результате редактирования докладчики в данной категории отсутствуют";
                  }
                }
              }
            });
          },
          function(response) {

          });
      });
    };

  }]

);
