(function () {
  'use strict';
  
  angular.module('app.home')
    .config(['$stateProvider', function ($stateProvider) {      
      $stateProvider
        .state('app.home', {
          url: '',
          views: {
            'content@': {
              templateUrl: 'modules/templates/home/index.html',
              controller: 'HomeController',
              controllerAs: 'homeCtrl'
            }
          },
          data: {
            stateTitle: "Meu site, minha vida.",
            animate: "slideTop"
          }
        });
    }])
    .controller('HomeController', HomeController);

  function HomeController ($state) {
    var homeCtrl = this;
  }
})();