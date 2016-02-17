'use strict';
module.exports= userSchema;

function userSchema(mongoose, locationSchema){
  
  return mongoose.Schema({
    name : {type: String, required: true},
    lastName: {type: String, required: true},
    nsApiId: {type: String},
    age: {type: Number, required: true},
    location: {type: locationSchema},
    motorist: {type: Boolean, default: false}
  }).index({ "location" : "2dsphere" });;
};