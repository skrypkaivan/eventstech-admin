'use strict';

angular.module('itytApp', ['ngResource', 'pasvaz.bindonce']).config(function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl',
      resolve: {
        categories: function(Events) {
          return Events.getCategories();
        }/*,
        events: function(Events) {
          return Events.getByCategory();
        }*/
      }
    })
    .when('/speakers', {
      templateUrl: 'views/speakers.html',
      controller: 'SpeakersCtrl',
      resolve: {
        categories: function(Speakers) {
          return Speakers.getCategories();
        }/*,
        events: function(Speakers) {
          return Speakers.getByCategory();
        }*/
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');

});
