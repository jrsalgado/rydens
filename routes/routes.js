'use strict';

exports.register = function (server, options, next) {
    console.log('routes')
    next();
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};