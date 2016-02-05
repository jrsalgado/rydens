/*global process*/
'use strict';

var di = require('ng-di');

// Create server module
var server = di.module('server', []);

// Configuration
server.config(function($provide){
  var conf = require('./config');
  $provide.constant('config', (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')? conf.development: process.env.NODE_ENV );
});

// Register factories and constant libraries
server.constant('express', require('express'));

// Register App dependencies
server.factory('app', require('./app/index.js'));

server.run(function( app, config){
  
});

// Run App
di.injector(['server']);