'use strict';

angular.module('itytApp').controller('EventsCtrl',
  ['$scope',
   '$routeParams',
   '$location',
   'CategoriesData',
   'EventsData',
   'CategoryEditModal',
   'EventEditModal',
   'ConfirmationWindow',
   'Page',
   'Constants',
   'EventCategory',
   'Event',
  function ($scope, $routeParams, $location, CategoriesData, EventsData, CategoryEditModal, EventEditModal, ConfirmationWindow, Page, Constants, EventCategory, Event) {

    //ToDO: make propper errors handling
    var title = [Constants.meta.SITE_NAME, CategoriesData.error ? 'Ошибка' : 'События'];
    Page.setTitle(title.join(' - '));
    $scope.categories = CategoriesData;
    $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
    $scope.message = "";
    $scope.events = [];
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
        EventCategory.create(data,
            function(data) {
                $scope.categories.push(data);
            },
            function(response) {
                if (response.data.fieldErrors) {

                }
            }
        );
      })
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
        EventCategory.save(data,
            function (response) {
                for (var i = 0, l = $scope.categories.length; i < l; i++) {
                    if ($scope.categories[i]._id === response._id) {
                        $scope.categories[i] = response;
                        break;
                    }
                }
                if ($scope.category && $scope.category._id) {
                    $scope.category = response;
                }
            },
            function (response) {
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
        EventCategory.delete({tagId:category._id},
            function(response) {
                var index = $scope.categories.indexOf(category);
                if (+$scope.category._id === +category._id) {
                    $scope.category = null;
                    $scope.events = [];
                    $scope.message = "Выберите категорию событий";
                }
                $scope.categories.splice(index ,1);
            },
            function(response) {
                if (response.data.fieldErrors) {

                }
            }
        );
      });
    };

    //ToDO: make propper errors handling
    $scope.deleteEvent = function(event) {
      ConfirmationWindow.show({
        resolve: {
          windowTitle: function() {
            return 'Удалить событие ' + event.name + ' окончательно из всех категорий?';
          }
        }
      }).then(function() {
        Event.delete({slug:event._id}, function(response) {
            var index = $scope.events.indexOf(event);
            $scope.events.splice(index ,1);
            if (!$scope.events.length) {
              $scope.message = "События в категории отсутствуют";
            }
          }, function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.deleteEventFromCategory = function(event, category) {
      ConfirmationWindow.show({
        resolve: {
          windowTitle: function() {
            return 'Удалить событие ' + event.name + ' из категории ' + category.name + '?';
          }
        }
      }).then(function() {
        event.tags.find(function(elem, index) {
            if (elem.slug === category.slug) {
                event.tags.splice(index, 1);
                return true;
            }
        });
        Event.save(event, function(response) {
            //Deleting event from category in UI
            $scope.events.splice($scope.events.indexOf(event) ,1);
            if (!$scope.events.length) {
              $scope.message = "События в категории отсутствуют";
            }
          }, function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.addEvent = function() {
      EventEditModal.show().then(function(event) {
        Event.create(event, function(response) {
            var isPersistedInCategory = false;
            isPersistedInCategory = $scope.category.slug && response.tags.find(function(elem) {
              return $scope.category.slug === elem.slug;
            });
            // If added event has preserved its category (as well as still holds no tags when has been uncategorized initially) - adding it
            if ((!$scope.category.slug && !response.tags.length) || isPersistedInCategory) {
              $scope.events.push(response);
            }
          },
          function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.editEvent = function(event) {
      EventEditModal.show({
        resolve: {
          event: function($q, Event) {
            var deferred = $q.defer();
            Event.get({slug:event.slug}, function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
          },
          categories: function() {
            return CategoriesData;
          }
        }
      }).then(function(data) {
        Event.save(data, function(response) {
            $scope.events.find(function(elem, index) {
              var isPersistedInCategory = false;
              if (elem.slug === response.slug) {
                isPersistedInCategory = $scope.category.slug && response.tags.find(function(elem) {
                  return $scope.category.slug === elem.slug;
                });
                // If updated event has preserved its category (as well as still holds no tags when has been uncategorized initially) -
                // persist it, otherwise deleting it from the current category's events list
                if ((!$scope.category.slug && !response.tags.length) || isPersistedInCategory) {
                  $scope.events[index] = response;
                }
                else {
                  $scope.events.splice(index, 1);
                  if (!$scope.events.length) {
                    $scope.message = "В результате редактирования события в данной категории отсутствуют";
                  }
                }
              }
            });
          },function(response) {

          });
      });
    };

  }]
);
