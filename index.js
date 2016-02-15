/*global process*/
'use strict';

var di = require('ng-di');

// Run App
di.injector([require('./server.js')]);