(function () {
  'use strict';
  angular.module('app').run(['profileService', 'Restangular', '$rootScope', '$state', run]);
  
  function run (profileService, Restangular, $rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
      // Define o título da página a cada troca de estado da aplicação
      $rootScope.stateTitle = $state.current.data.stateTitle;
    });

    // Inteceptação de erros nas chamadas via Restangular
    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
      if (response.status !== 200) {
        console.log(response);
        return false;
      }

      return true;
    });

    $state.go('app.home');
    profileService.getUserGithub();
  }
})();