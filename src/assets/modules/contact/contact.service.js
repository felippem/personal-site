(function () {
  'use strict';
  angular.module('app')
    .factory('contactService', ['Restangular', contactService]);

  function contactService (Restangular) {
    /**
     * Realiza a chamada da api interna, para criar um novo contato no banco.
     * @param contact [schema mongoose]
     * @param successCallback [function]
     * @param errorCallback [function]
     * return object
     */
    function create (contact, successCallback, errorCallback) {
      return Restangular.one('api', 'contact').customPUT(contact).then(function (response) {
        successCallback(Restangular.stripRestangular(response));
      }, function (response) {
        errorCallback(response);
      });
    }
    
    return {
      create: create
    };
  }
})();