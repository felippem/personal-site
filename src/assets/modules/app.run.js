(function () {
  'use strict';
  angular.module('app').run(['$rootScope', '$state', run]);
  
  function run ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.stateTitle = $state.current.data.stateTitle;
    });

    $state.go('app.home');
  }
})();