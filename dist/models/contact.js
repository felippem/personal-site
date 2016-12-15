/*global require, module, console*/
(function () {
  'use strict';
  var mongoConfig = require('../config/mongoDB'),
    contactModel = require('../models/schemas/contact');

  var Contact = function () {
    this.email = null;
    this.message = null;
    
    this.save = function (callback) {
      Contact.save(this, callback);
    };
  };

  Contact.save = function (contact, callback) {
    mongoConfig.connect();

    var Model = new contactModel({
      email: contact.email,
      message: contact.message
    }); 

    Model.save(function (err, rows, numAffected) {
      mongoConfig.disconnect();
      callback(err, rows, numAffected);
    });
  };

  module.exports = Contact;
})();