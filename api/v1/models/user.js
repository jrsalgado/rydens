'use strict';
module.exports = Users;

function Users(mongoose, userSchema){
  // Todo: handle validations errors
  return mongoose.model('User',userSchema);
}