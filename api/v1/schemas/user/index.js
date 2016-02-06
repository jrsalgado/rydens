'use strict';
module.exports= userSchema;
userSchema.$inject = ['mongoose', 'schema.location'];

function userSchema(mongoose, schemaLocation){
  
  return mongoose.Schema({
    name : {type: String},
    lastName: {type: String},
    nsApiId: {type: String},
    age: {type: Number},
    location: {type: schemaLocation},
    driver: {type: Boolean, default: false}
  }).index({ "location" : "2dsphere" });;
};