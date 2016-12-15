(function () {
  'use strict';
  var message = {
    status: function (code, text, res) {
      if (res) {
        res.status(code);
      }
      
      return {
        status: code,
        message: text
      };
    }
  };

  module.exports = message;
})();