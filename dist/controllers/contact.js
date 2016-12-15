/*global require, module, console*/
(function () {
  'use strict';
  var contactModel = require('../models/contact'),
    message = require('../config/message');

  var contactController = {
    create: function (req, res, next) {
      var contact = new contactModel();
      contact.email = req.body.email;
      contact.message = req.body.message;

      contact.save(function (err, rows, numAffected) {
        if (!err) { 
          res.send(rows);
        } else {
          res.send(message.status(500, 'Ops, ' + ((err && err.message) || 'fail.'), res));
        }
      });
    }
  };

  module.exports = contactController;
})();