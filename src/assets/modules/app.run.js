(function () {
  'use strict';
  angular.module('app').run(['profileService', '$rootScope', '$state', run]);
  
  function run (profileService, $rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.stateTitle = $state.current.data.stateTitle;
    });

    $state.go('app.home');
    profileService.getUserGithub();
  }
})();