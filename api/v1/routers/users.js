'use strict';
module.exports = usersRouter;

function usersRouter(express, validator, expressJoi, usersCtrls){
  //Todo: inject a router instance
  var router = express.Router();
  
  // save a user
  router.post('/', expressJoi.joiValidate(validator.users.post),usersCtrls.createOne);
  // get a list of users
  router.get('/', usersCtrls.getAll);
  // get user by id
  router.get('/:id', expressJoi.joiValidate(validator.users.urlId), usersCtrls.getById);
  // remove user by id
  router.delete('/:id', expressJoi.joiValidate(validator.users.urlId), usersCtrls.removeById);
  // update user by id
  router.put('/:id', expressJoi.joiValidate(validator.users.urlId),usersCtrls.updateById);

  return router;
}
