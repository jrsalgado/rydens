/*global process*/
'use strict';

var di = require('ng-di');

// Create server module
var server = di.module('server', []);

// Configuration
  // set process.env
server.config(function setEnvVar($provide){
  var env = require('./config').development;
  process.env.NODE_ENV = process.env.NODE_ENV || env.NODE_ENV;
  process.env.PORT = process.env.PORT || env.PORT;
  process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || env.db.MONGOLAB_URI;
});

server.config(function promiseLibraries( mongoose, Promise){
  Promise.promisifyAll(mongoose);
});

  // connect Mongo data base
server.config(function connectMongodb(mongoose){
  mongoose.connect(process.env.MONGOLAB_URI);
});

// Register factories and constant libraries
server.constant('express', require('express'));
server.constant('mongoose', require('mongoose'));
server.constant('bodyParser', require('body-parser'));
server.constant('expressJoi', require('express-joi'));
server.constant('q', require('q'));
server.constant('Promise',  require('bluebird'));

// Register App dependencies
  // schemas
server.factory('schema.location', require('./api/v1/schemas/location'));
server.factory('schema.user', require('./api/v1/schemas/user'));
  // models
server.factory('model.user', require('./api/v1/models/user'));
  // routes
server.factory('users.router', require('./api/v1/routers/users'));
server.factory('main.router', require('./api/v1/routers/main'));

  // Middlewares
server.factory('users.controllers', require('./api/v1/middlewares/users'));
server.factory('drivers.controllers', require('./api/v1/middlewares/drivers'));
server.factory('validator', require('./api/v1/middlewares/utils/validator'));

server.constant('app', require('express')());

module.exports = server;
 