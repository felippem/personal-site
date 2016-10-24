(function () {
  'use strict';
  angular.module('app', [
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'restangular',
    'app.home',
    'app.contact'
  ]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
  }]);
})();