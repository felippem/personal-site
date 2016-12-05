/*global require, module, console*/
(function () {
  'use strict';
  var mongoose = require('mongoose');

  var mongoConfig = {
    disconnect: function () {
      mongoose.connection.close();
    },
    connect: function () {
      var uri = process.env.MONGO_URI || 'mongodb://felippe:felippe@192.168.0.100:27017/felippe';

      var options = { 
        db: { native_parser: true }, 
        server: { poolSize: 5 },
        replset: { rs_name: 'myReplicaSetName' }
      };

      mongoose.connection.on('connected', function () {  
        console.log('MongoDB connected');
      });

      mongoose.connection.on('error',function (err) {  
        console.log('MongoDB connection error: ' + err);
      });

      mongoose.connection.on('disconnected', function () {
        console.log('MongoDB disconnected');
      });

      process.on('SIGINT', function () {
        mongoose.connection.close(function () {
          console.log('MongoDB disconnected: node close');
          process.exit(0);
        });
      });

      return mongoose.connect(uri, options);
    }
  };

  module.exports = mongoConfig;
})();