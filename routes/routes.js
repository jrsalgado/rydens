'use strict';

exports.register = function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/gps',
      handler: function (request, reply) {
          console.log(request.payload)
          reply('gps');
      }});
      server.route({
      method: 'POST',
      path: '/gps',
      handler: function (request, reply) {
          console.log(request.payload)
          reply('gps');
      }});
    next();
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};