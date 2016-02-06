'use strict';
module.exports = locationSchema;
locationSchema.$inject = ['mongoose'];

function locationSchema(mongoose){
  return mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  })
}