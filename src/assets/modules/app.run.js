(function () {
  'use strict';

  angular.module('app').run(run);
  
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.stateTitle = $state.current.data.stateTitle;
    });
  }
})();