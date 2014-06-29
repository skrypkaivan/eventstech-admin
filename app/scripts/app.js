'use strict';

angular.module('itytApp', ['ngRoute', 'pasvaz.bindonce', 'ui.bootstrap', 'ui.tinymce'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        resolve: {
          CategoriesData: function(Events) {
            return Events.getCategories();
          },
          EventsData: function() {
            return [];
          }
        }
      })
      .when('/events/tag/:categoryId', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        resolve: {
          CategoriesData: function(Events) {
            return Events.getCategories();
          },
          EventsData: function($route, Events) {
            return Events.getByCategory($route.current.params.categoryId);
          }
        }
      })
      .when('/speakers', {
        templateUrl: 'views/speakers.html',
        controller: 'SpeakersCtrl',
        resolve: {
          CategoriesData: function(Speakers) {
            return Speakers.getCategories();
          },
          SpeakersData: function() {
            return [];
          }
        }
      })
      .when('/speakers/tag/:categoryId', {
        templateUrl: 'views/speakers.html',
        controller: 'SpeakersCtrl',
        resolve: {
          CategoriesData: function(Speakers) {
            return Speakers.getCategories();
          },
          SpeakersData: function($route, Speakers) {
            return Speakers.getByCategory($route.current.params.categoryId);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  }]);