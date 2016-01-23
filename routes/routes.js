'use strict';
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
var PointSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    loc: {
        type: { type: String },
        coordinates: { type: [Number] }
    },
    user: { type: String }
}, { collection: "points" });
PointSchema.index({ loc: "2dsphere" });
mongoose.model("Point", PointSchema);

var Point = mongoose.model("Point");

PointSchema.index({ loc: "2dsphere" });
mongoose.model("Point", PointSchema);
exports.register = function (server, options, next) {
  
    server.route({
      method: 'GET',
      path: '/gps/{chofer}',
      handler: function (request, reply) {
          console.log(request.payload)
          Point.find({chofer: request.params.chofer}).where('loc').exec(function (error, result) {
              reply({positions:result});
          });
      }});
      
      server.route({
      method: 'POST',
      path: '/gps',
      handler: function (request, reply) {
          console.log(request.payload)
          var MyPoint = new Point({
            _id: mongoose.Types.ObjectId(),
            loc:{
              type:'Point',
              coordinates:[request.payload.longitude, request.payload.latitude],
              chofer: request.payload.name
              }
            });
          MyPoint.save(function(){
            console.log(arguments)
            reply({res:arguments});
          })
          
      }});
    next();
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};