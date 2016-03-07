'use strict';

module.exports = usersCtrls;

function usersCtrls(usersMiddlewares) {
  // Todo; Routes should pass error to next
  return {
    getAll: getAll,
    createOne: createOne,
    removeById: removeById,
    updateById: updateById,
    getById: getById
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
  
  function removeById(req, res, next) {
    return usersMiddlewares.removeById(req, res)
    .then(res.json.bind(res))
    .catch(next);
  }
  
  function updateById(req, res, next) {
    return usersMiddlewares.updateById(req. res)
    .then(res.json.bind(res))
    .catch(next);
  }
  
  function getById(req, res, next){
    return usersMiddlewares.getById(req, res)
    .then(logic)
    .catch(next);
    
    function logic(result){
      if(!result){
        res.status(404).send('User not found');
      }
      res.json(result);
    }
    
  }

}
