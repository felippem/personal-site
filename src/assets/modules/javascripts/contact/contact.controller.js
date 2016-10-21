(function () {
  'use strict';
  angular.module('app.contact')
    .config(['$stateProvider', function ($stateProvider) {      
      $stateProvider
        .state('app.contact', {
          url: '/fale-comigo',
          views: {
            'content@': {
              templateUrl: 'modules/templates/contact/index.html',
              controller: 'ContactController',
              controllerAs: 'contactCtrl'
            }
          },
          data: {
            stateTitle: "Vamos trabalhar juntos?",
            animate: "slideTop"
          }
        });
    }])
    .controller('ContactController', ['$state', '$scope', ContactController]);

  function ContactController ($state, $scope) {
    var contactCtrl = this;
  }
})();