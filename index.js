'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: process.env.PORT });

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI);

var LocationObject = new Schema({
    loc: {
      type: { type: String },
      coordinates: []
    }
  });
  // define the index
  LocationObject.index({ loc : '2dsphere' });

var Location = mongoose.model('Location', LocationObject);
var myLocation = new Location({
  type:'Point',
  coordinates: [-111.0162348, 29.1037726]
});

myLocation.save(function(){
  console.log(arguments)
})

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

server.start(() => {
    console.log('Server running at:', server.info.uri);
});