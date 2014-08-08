'use strict';

angular.module('itytApp', ['ngRoute', 'pasvaz.bindonce', 'ui.bootstrap', 'ui.tinymce', 'angucomplete', 'pasvaz.bindonce', 'ngCookies'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/', {
        templateUrl: 'partials/events.html',
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
        templateUrl: 'partials/events.html',
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
        templateUrl: 'partials/speakers.html',
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
        templateUrl: 'partials/speakers.html',
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

  }]).run(function ($rootScope, $location, AuthenticationService) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/login'];

    // check if current location matches route
    var routeClean = function (route) {
      return routesThatDontRequireAuth.find(function (noAuthRoute) {
        console.log(route + " " + noAuthRoute + (noAuthRoute.indexOf(route) !== -1));
        return noAuthRoute.indexOf(route) !== -1;
      });
    };

    $rootScope.$on('$stateChangeStart', function () {
      console.log('$stateChangeStart');
      // if route requires auth and user is not logged in
      if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
        // redirect back to login
        $location.path('/login');
      }
    });

  });