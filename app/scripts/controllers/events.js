'use strict';

angular.module('itytApp').controller('EventsCtrl',
  ['$scope', '$routeParams', '$location','CategoriesData', 'EventsData', 'CategoryEditModal', 'EventEditModal', 'ConfirmationWindow', 'Events', 'Page', 'Constants',
  function ($scope, $routeParams, $location, CategoriesData, EventsData, CategoryEditModal, EventEditModal, ConfirmationWindow, Events, Page, Constants) {

    //ToDO: make propper errors handling
    var title = [Constants.meta.SITE_NAME, CategoriesData.error ? 'Ошибка' : 'События'];
    Page.setTitle(title.join(' - '));
    $scope.categories = CategoriesData;
    $scope.categories.unshift({name: 'Без категории', slug: 'uncategorised'});
    $scope.message = "";
    $scope.events = [];
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
        Events.deleteCategory(category)
          .success(function(response) {
            var index;
            if (response.error) {
              return;
            }

            index = $scope.categories.indexOf(category);
            if (+$scope.category._id === +category._id) {
              $scope.category = null;
              $scope.events = [];
              $scope.message = "Выберите категорию событий";
            }
            $scope.categories.splice(index ,1);

          })
          .error(function(response) {

          });
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
        Events.deleteEvent(event)
          .success(function(response) {
            var index;
            if (response.error) {
              return;
            }
            index = $scope.events.indexOf(event);
            $scope.events.splice(index ,1);
            if (!$scope.events.length) {
              $scope.message = "События в категории отсутствуют";
            }
          })
          .error(function(response) {

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
        Events.editEvent(event)
          .success(function(response) {

            if (response.error) {
              return;
            }

            //Modifying event's tags
            event.tags.find(function(elem, index) {
              if (elem._id === category._id) {
                event.tags.splice(index, 1);
                return true;
              }
            });

            //Deleting event from category in UI
            $scope.events.splice($scope.events.indexOf(event) ,1);
            if (!$scope.events.length) {
              $scope.message = "События в категории отсутствуют";
            }
          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.addEvent = function() {
      EventEditModal.show().then(function(event) {
        Events.addEvent(event)
          .success(function(response) {

            //TODO: operate with a real response - not the input data, pay also attention to image's path handling
            var isPersistenInCategory = false, data = event;
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
              $scope.events.push(data);
            }

          })
          .error(function(response) {

          });
      });
    };

    //ToDO: make propper errors handling
    $scope.editEvent = function(event) {
      EventEditModal.show({
        resolve: {
          event: function() {
            return event;
          },
          categories: function() {
            return CategoriesData;
          }
        }
      }).then(function(data) {
        Events.editEvent(data)
          .success(function(response) {
            if (response.error) {
              return;
            }
            //TODO: operate with a real response - not the input data, pay also attention to image's path handling
            $scope.events.find(function(elem, index) {
              var isPersistenInCategory = false;
              if (+elem._id === +data._id) {
                isPersistenInCategory = $scope.category._id && data.tags.find(function(elem) {
                  return +$scope.category._id === +elem._id;
                });
                // If updated event has preserved its category (as well as still holds no tags when has been uncategorized initially) -
                // persist it, otherwise deleting it from the current category's events list
                if ((!$scope.category._id && !data.tags.length) || isPersistenInCategory) {
                  $scope.events[index] = data;
                }
                else {
                  $scope.events.splice(index, 1);
                  if (!$scope.events.length) {
                    $scope.message = "В результате редактирования события в данной категории отсутствуют";
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
