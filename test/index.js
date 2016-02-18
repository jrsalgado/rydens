var di = require('ng-di');
var server = require('../server.js');

var test = di.module('test', ['server']);

// Declare constants
test.constant('httpMocks', require('express-mocks-http'));
test.constant('chai-as-promised', require('chai-as-promised'));
test.constant('chai', require('chai'));
// Declare Factories
test.factory('mocks', require('./mocks'));
test.factory('users', require('./middlewares/users'));
test.factory('motorists', require('./middlewares/motorists'));

test.run(['users', 'motorists', function(users, motorists){}]);
di.injector(['test']);
