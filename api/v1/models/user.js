'use strict';
module.exports = Users;
Users.$inject = ['mongoose', 'schema.user'];

function Users(mongoose, schemaUser){
  return mongoose.model('User',schemaUser);
}