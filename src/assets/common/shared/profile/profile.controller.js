(function () {
  'use strict';
  angular.module('app')
    .controller('ProfileController', [ 'profileService', '$state', '$scope', ProfileController]);

  function ProfileController(profileService, $state, $scope) {
    var profileCtrl = this;
    
    profileCtrl.service = profileService;
  }
})();