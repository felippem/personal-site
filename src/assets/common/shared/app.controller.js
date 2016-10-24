(function () {
  'use strict';
  angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('app', {
          url: '',
          views: {
            'profile': {
              templateUrl: 'modules/templates/common/shared/profile.html',
              controller: 'ProfileController',
              controllerAs: 'profileCtrl'
            },
            'content': {}
          },
          abstract: true
        });
    }])
    .controller('AppController', ['$state', '$scope', AppController]);

  function AppController ($state, $scope) {
    var appCtrl = this;
  }
})();