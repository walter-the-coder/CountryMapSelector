'use strict';

angular
  .module('knowitApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/angularEksempel', {
        templateUrl: 'views/angulareksempel.html',
        controller: 'AngulareksempelCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
