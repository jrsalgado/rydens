'use strict';

module.exports = usersCtrls;

function usersCtrls(UserModel) {

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
    var promise;

    promise = UserModel.findAsync();
    promise.then(success);
    promise.catch(error);
    
    function success(users){
      return users;
    }
    
    function error(err){
      return err;
    }
    
    return promise;
  }
  
  function saveNewUser(req, res, next) {
    var promise;

    var newUser = new UserModel(req.body);
    promise = newUser.saveAsync();
    promise.then(success);
    promise.catch(error);
    
    function success(user){
      return user;
    };
    
    function error(err){
      return err;
    }
    
    return promise;
  }
  
}
