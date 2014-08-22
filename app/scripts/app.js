'use strict';

angular.module('itytApp', ['ngResource','ngRoute', 'pasvaz.bindonce', 'ui.bootstrap', 'ui.tinymce', 'angucomplete', 'pasvaz.bindonce', 'ngCookies'])
  .config(['$routeProvider', '$locationProvider','$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/', {
        templateUrl: 'partials/events.html',
        controller: 'EventsCtrl',
        resolve: {
          CategoriesData: function($q, EventCategory) {
            var deferred = $q.defer();
            EventCategory.query({}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          },
          EventsData: function() {
            return [];
          }
        }
      })
      .when('/events/tag/:slug', {
        templateUrl: 'partials/events.html',
        controller: 'EventsCtrl',
        resolve: {
          CategoriesData: function($q, EventCategory) {
            var deferred = $q.defer();
            EventCategory.query({}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          },
          EventsData: function($q, $route, Event) {
            var deferred = $q.defer();
            Event.getByCategory({tag:$route.current.params.slug}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          }
        }
      })
      .when('/speakers', {
        templateUrl: 'partials/speakers.html',
        controller: 'SpeakersCtrl',
        resolve: {
          CategoriesData: function($q, SpeakerCategory) {
            var deferred = $q.defer();
            SpeakerCategory.query({}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          },
          SpeakersData: function() {
            return [];
          }
        }
      })
      .when('/speakers/tag/:slug', {
        templateUrl: 'partials/speakers.html',
        controller: 'SpeakersCtrl',
        resolve: {
          CategoriesData: function($q, SpeakerCategory) {
            var deferred = $q.defer();
            SpeakerCategory.query({}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          },
          SpeakersData: function($q, $route, Speaker) {
            var deferred = $q.defer();
            Speaker.getByCategory({tag:$route.current.params.slug}, function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push("AuthenticationInterceptor");

  }]).run(function ($rootScope, $location, AuthenticationService) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/login'];

    // check if current location matches route
    var routeClean = function (route) {
      return routesThatDontRequireAuth.find(function (noAuthRoute) {
        console.log(route + " " + noAuthRoute + (noAuthRoute === route));
        return noAuthRoute === route;
      });
    };

    var isAuthorizationRequired = function () {
        if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
            // redirect back to login
            $location.path('/login');
        }
    };

    $rootScope.$on('$stateChangeStart', function () {
      console.log('$stateChangeStart');
      // if route requires auth and user is not logged in
        isAuthorizationRequired();
    });

    isAuthorizationRequired();
  });