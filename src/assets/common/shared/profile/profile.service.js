(function () {
  'use strict';
  angular.module('app')
    .factory('profileService', ['Restangular', profileService]);

  function profileService (Restangular) {
    var profile;

    function get () {
      return profile;
    }
    
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