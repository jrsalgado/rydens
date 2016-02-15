'use strict';

module.exports = usersCtrls;

function usersCtrls(UserModel) {
  // Todo; Routes should respond to client
  return {
    fetchAllUsers: fetchAllUsers,
    saveNewUser: saveNewUser
  }

    // usersCtrl.fetchAllUsers(req, res)
    // .then(function(users){
    //   return res.json(users);
    //   })
    // .catch( function(err){
    //   return res.json(err);
    // })
    // .done();

  function fetchAllUsers(req, res, next) {
    return UserModel.findAsync();
  }
  
  function saveNewUser(req, res, next) {
    var newUser = new UserModel(req.body);
    return newUser.saveAsync();
  }
  
}
