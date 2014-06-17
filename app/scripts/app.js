'use strict';

angular.module('itytApp', ['ngResource', 'ngRoute', 'pasvaz.bindonce', 'ui.bootstrap']).config(function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl',
      resolve: {
        categories: function(Events) {
          return Events.getCategories();
        },
        events: function() {
          return [];
        }
      }
    })
    .when('/events/tag/:name', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl',
      resolve: {
        categories: function(Events) {
          return Events.getCategories();
        },
        events: function($route, Events) {
          return {
            data: Events.getByCategory($route.current.params.name),
            category: $route.current.params.name
          }
        }
      }
    })
    .when('/speakers', {
      templateUrl: 'views/speakers.html',
      controller: 'SpeakersCtrl',
      resolve: {
        categories: function(Speakers) {
          return Speakers.getCategories();
        },
        speakers: function() {
          return [];
        }
      }
    })
    .when('/speakers/tag/:name', {
      templateUrl: 'views/speakers.html',
      controller: 'SpeakersCtrl',
      resolve: {
        categories: function(Speakers) {
          return Speakers.getCategories();
        },
        speakers: function($route, Speakers) {
          return {
            data: Speakers.getByCategory($route.current.params.name),
            category: $route.current.params.name
          }
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');

});
