'use strict';

angular.module('itytApp', ['ngResource', 'pasvaz.bindonce']).config(function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/events.html',
      controller: 'EventsCtrl',
      resolve: {
        data: function(Events) {
          return Events.getAll();
        }
      }
    })
    .when('/speakers', {
      templateUrl: 'views/speakers.html',
      controller: 'SpeakersCtrl',
      resolve: {
        data: function(Speakers) {
          return Speakers.getAll();
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');

});
