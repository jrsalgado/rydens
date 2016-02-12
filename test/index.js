var di = require('ng-di');
var server = require('../index.js');

var test = di.module('test', ['server']);

// Declare constants
test.constant('httpMocks', require('express-mocks-http'));
test.constant('chai-as-promised', require('chai-as-promised'));
test.constant('chai', require('chai'));
// Declare Factories
test.factory('mocks', require('./mocks'));
test.factory('users', require('./users'));
test.run(['users',function(users){

}]);
di.injector(['test']);
