'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: process.env.PORT, routes: { cors: true } });
const routes = require('./routes/routes');

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register(routes, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});