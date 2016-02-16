/*global process*/
'use strict';

var di = require('ng-di');
var server = require('./server.js');
// Run App
di.injector(['server']);