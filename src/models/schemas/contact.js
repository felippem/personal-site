/*global require, module, console*/
(function () {
  'use strict';
  var mongoose = require('mongoose');

  var ContactSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    message: { 
      type: String 
    }
  }), contactModel = mongoose.model('Contact', ContactSchema);

  module.exports = contactModel;
})();