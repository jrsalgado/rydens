'use strict';

module.exports = usersCtrls;

function usersCtrls(UserModel, q) {

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
    var def =q.defer();
    UserModel.find(function (err, users) {
      if(!!err){
        def.reject(err);
      }else{
        def.resolve(users);
      }
    });
    return def.promise;
  }

  function saveNewUser(req, res) {
    var def = q.defer();
    var newUser = new UserModel(req.body);
    newUser.save(function(err, user){
       if(!!err){
         def.reject(err);
       }else{
         def.resolve(user);
       }
    });
    return def.promise;
  }
}
