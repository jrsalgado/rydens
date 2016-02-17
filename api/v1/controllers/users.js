'use strict';

module.exports = usersCtrls;

function usersCtrls(usersMiddlewares) {
  // Todo; Routes should pass error to next
  return {
    getAll: getAll,
    createOne: createOne
  }

  function getAll(req, res, next) {
    return usersMiddlewares.fetchAllUsers(req, res)
    .then(res.json.bind(res))
    .catch(next);
  }
  
  function createOne(req, res, next) {
    return usersMiddlewares.saveNewUser(req, res)
    .then(res.json.bind(res))
    .catch(next);
  }

}
