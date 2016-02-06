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
  // conect Mongo data base
server.config(function connectMongodb($provide, mongoose){
  console.log('conecting mongo');
  mongoose.connect(process.env.MONGOLAB_URI);
});

// Register factories and constant libraries
server.constant('express', require('express'));
server.constant('mongoose', require('mongoose'));

// Register App dependencies
server.factory('schema.location', require('./api/v1/schemas/location'));
server.factory('schema.user', require('./api/v1/schemas/user'));
server.factory('model.user', require('./api/v1/models/user'));

server.factory('app', require('./app/index.js'));

server.run(['app','model.user',function runApp(app, User){
  
}]);

// Run App
di.injector(['server']);