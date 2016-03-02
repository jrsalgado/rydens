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
server.constant('morgan',  require('morgan'));
server.constant('uuid',  require('node-uuid'));

// Register App dependencies
  // schemas
server.factory('locationSchema', require('./api/v1/schemas/location'));
server.factory('userSchema', require('./api/v1/schemas/user'));
  // models
server.factory('UserModel', require('./api/v1/models/user'));
  // routes
server.factory('usersRouter', require('./api/v1/routers/users'));
server.factory('motoristsRouter', require('./api/v1/routers/motorists'));
server.factory('main.router', require('./api/v1/routers/main'));

  // Controllers
server.factory('usersCtrls', require('./api/v1/controllers/users'));
server.factory('motoristsCtrls', require('./api/v1/controllers/motorists'));
  // Middlewares
server.factory('usersMiddlewares', require('./api/v1/middlewares/users'));
server.factory('motoristsMiddlewares', require('./api/v1/middlewares/motorists'));
server.factory('validator', require('./api/v1/controllers/utils/validator'));

server.constant('app', require('express')());

server.run(require('./app/index.js'));

module.exports = server;
 