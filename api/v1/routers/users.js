'use strict';
module.exports = usersRouter;

function usersRouter(express, validator, expressJoi, usersCtrls){
  //Todo: inject a router instance
  var router = express.Router();
  
  router.post('/', expressJoi.joiValidate(validator.users.post));
  router.post('/', usersCtrls.createOne);
  
  router.get('/', usersCtrls.getAll);

  return router;
}
