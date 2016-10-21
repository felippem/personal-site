(function () {
  'use strict';
  angular.module('app')
    .controller('ProfileController', [ '$state', '$scope', ProfileController]);

  function ProfileController($state, $scope) {
    var profileCtrl = this;
    
    profileCtrl.urlPhotoProfile = '//avatars2.githubusercontent.com/u/660003?v=3&s=466';
  }
})();