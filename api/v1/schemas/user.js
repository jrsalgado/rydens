'use strict';
module.exports= userSchema;
userSchema.$inject = ['mongoose', 'schema.location'];

function userSchema(mongoose, schemaLocation){
  
  return mongoose.Schema({
    name : {type: String, required: true},
    lastName: {type: String, required: true},
    nsApiId: {type: String},
    age: {type: Number, required: true},
    location: {type: schemaLocation},
    driver: {type: Boolean, default: false}
  }).index({ "location" : "2dsphere" });;
};