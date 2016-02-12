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
  // connect Mongo data base
server.config(function connectMongodb($provide, mongoose){
  mongoose.connect(process.env.MONGOLAB_URI);
});

// Register factories and constant libraries
server.constant('express', require('express'));
server.constant('mongoose', require('mongoose'));
server.constant('bodyParser', require('body-parser'));
server.constant('expressJoi', require('express-joi'));
server.constant('q', require('q'));

// Register App dependencies
  // schemas
server.factory('schema.location', require('./api/v1/schemas/location'));
server.factory('schema.user', require('./api/v1/schemas/user'));
  // models
server.factory('model.user', require('./api/v1/models/user'));
  // routes
server.factory('users.router', require('./api/v1/routers/users'));
server.factory('main.router', require('./api/v1/routers/main'));
server.factory('app', require('./app/index.js'));
  // Middlewares
server.factory('users.controllers', require('./api/v1/middlewares/users'));
server.factory('validator', require('./api/v1/middlewares/utils/validator'));

server.run(['app', 'users.controllers', function runApp(app, x){
//  console.log(x);
}]);

// Run App
di.injector(['server']);