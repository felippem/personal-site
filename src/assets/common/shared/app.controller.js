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
              controller: 'AppController',
              controllerAs: 'appCtrl'
            },
            'content': {}
          },
          abstract: true
        });
    }])
    .controller('AppController', ['$state', '$scope', AppController]);

  function AppController ($state, $scope) {
    var appCtrl = this;

    appCtrl.urlPhotoProfile = '//avatars2.githubusercontent.com/u/660003?v=3&s=466';
  }
})();