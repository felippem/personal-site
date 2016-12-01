(function () {
  'use strict';
  angular.module('app')
    .factory('profileService', ['Restangular', profileService]);

  function profileService (Restangular) {
    var profile;

    /**
     * Retorna a instância de profileService no contexto.
     * return profile
     */
    function get () {
      return profile;
    }
    
    /**
     * Realiza chamada a api pública do github e disponibiliza o objeto na instância de profileService.
     * return void 
     */
    function getUserGithub () {
      Restangular.oneUrl('github', 'https://api.github.com/users/felippem').get().then(function (response) {
        profile = Restangular.stripRestangular(response);
      });
    }

    return {
      get: get,
      getUserGithub: getUserGithub
    };
  }
})();