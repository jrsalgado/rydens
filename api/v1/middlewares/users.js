'use strict';

module.exports = usersMiddlewares;

function usersMiddlewares(UserModel) {

  return {
    fetchAllUsers: fetchAllUsers,
    saveNewUser: saveNewUser,
    deleteUser: deleteUser
  }

  function fetchAllUsers(req, res) {
    return UserModel.findAsync();
  }
  
  function saveNewUser(req, res) {
    var newUser = new UserModel(req.body);
    return newUser.saveAsync();
  }
  
  function deleteUser(req, res){
    return UserModel.findByIdAndRemove(req.params.id);
  }
  
}