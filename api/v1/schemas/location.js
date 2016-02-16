'use strict';
module.exports = locationSchema;

function locationSchema(mongoose){
  return mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  })
}