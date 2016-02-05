/*global process*/
'use strict';

var di = require('ng-di');

// Create server module
var server = di.module('server', []);

// Configuration
server.config(function setEnvVar($provide){
  var env = require('./config').development;
  process.env.NODE_ENV = process.env.NODE_ENV || env.node_env;
  process.env.PORT = process.env.PORT || env.port;
});

// Register factories and constant libraries
server.constant('express', require('express'));

// Register App dependencies
server.factory('app', require('./app/index.js'));

server.run(function runApp(app){
  
});

// Run App
di.injector(['server']);