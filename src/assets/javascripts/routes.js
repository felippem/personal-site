angular.module('app')
  .config(['$routeProvider', function ($routeProvider) {
      'use strict';      
      $routeProvider.when('/entre-em-contato', {
        templateUrl: 'templates/pages/contact/index.html'
      })
      .otherwise({ 
        redirectTo: '/', 
        templateUrl: 'templates/pages/home/index.html' 
      });
    }
]);