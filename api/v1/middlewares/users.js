'use strict';

module.exports = usersMiddlewares;

function usersMiddlewares(UserModel) {

  return {
    fetchAllUsers: fetchAllUsers,
    saveNewUser: saveNewUser
  }

  function fetchAllUsers(req, res) {
    return UserModel.findAsync();
  }
  
  function saveNewUser(req, res) {
    var newUser = new UserModel(req.body);
    return newUser.saveAsync();
  }
  
}