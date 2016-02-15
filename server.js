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
  process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || env.MONGOLAB_URI;
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
server.factory('locationSchema', require('./api/v1/schemas/location'));
server.factory('userSchema', require('./api/v1/schemas/user'));
  // models
server.factory('UserModel', require('./api/v1/models/user'));
  // routes
server.factory('users.router', require('./api/v1/routers/users'));
server.factory('main.router', require('./api/v1/routers/main'));

  // Middlewares
server.factory('usersCtrls', require('./api/v1/controllers/users'));
server.factory('driversCtrls', require('./api/v1/controllers/drivers'));
server.factory('validator', require('./api/v1/controllers/utils/validator'));

server.constant('app', require('express')());

server.run(require('./app/index.js'));

module.exports = server;
 