'use strict';

module.exports = usersCtrls;

function usersCtrls(usersMiddlewares) {
  // Todo; Routes should pass error to next
  return {
    getAll: getAll,
    createOne: createOne
  }

  function getAll(req, res, next) {
    usersMiddlewares.fetchAllUsers(req, res)
    .then(function succes(users){
      res.json(users);
    })
    .catch(function error(err){
      next(err);
    });
  }
  
  function createOne(req, res, next) {
    usersMiddlewares.saveNewUser(req, res)
    .then(function success(user){
      res.json(user);
    })
    .catch(function error(err){
      next(err)
    });
  }

}
