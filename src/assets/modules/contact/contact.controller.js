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
    .controller('ContactController', ['contactService', '$state', '$scope', ContactController]);

  function ContactController (contactService, $state, $scope) {
    var contactCtrl = this;
    
    _setFeedback('Pronto, enviar', 'default');

    contactCtrl.send = function (viewModel) {
      if (!viewModel) {
        return;
      }

      _create(viewModel);
    };

    /**
     * Métodos privados
     */
    
    /**
     * Realiza a chamada ao service, para criar um novo contato no banco.
     * @param viewModel [contexto]
     */
    function _create (viewModel) {
      contactService.create(viewModel, function () {
        _setFeedback('Tudo ok. Obrigado pelo contato.', 'success');
        $scope.contact = undefined;
      }, function (response) {
        _setFeedback('Ops, deu ruim.', 'error');
        console.log(response);
      });
    }

    /**
     * Define no $scope um objeto responsável por conter mensagens de interação
     * com o usuário e demais questões pertinentes ao contexto.
     * @param message [string]
     * @param className [string]
     */
    function _setFeedback (message, className) {
      $scope.feedback = {
        message: message, 
        class: className
      };
    }
  }
})();