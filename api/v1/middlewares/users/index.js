'use strict';

module.exports = usersCtrls;
usersCtrls.$inject = ['model.user', 'q'];

function usersCtrls(User, Q) {

  return {
    fetchAllUsers: fetchAllUsers,
    saveNewUser: saveNewUser
  }

  function fetchAllUsers(req, res) {
    var deferred =Q.defer();
    User.find(function (err, users) {
      if(!!err){
        deferred.reject(err);
      }else{
        deferred.resolve(users);
      }
    });
    return deferred.promise;
  }

  function saveNewUser(req, res) {
    // store in data base
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
      res.send(user);
    });
  }
}
