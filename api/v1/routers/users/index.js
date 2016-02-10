'use strict';
module.exports = usersRouter;
usersRouter.$inject = ['express', 'validator', 'expressJoi', 'model.user'];

function usersRouter(express, validator, expressJoi, User){
  var router = express.Router();
  
  router.post('/', expressJoi.joiValidate(validator.users.post),function(req, res){
    // store in data base
    var newUser = new User(req.body);
    newUser.save(function(err, user){
       res.send(user);
    });
  });
  
  router.get('/',function(req, res){
    User.find(function(err, users){
      res.send(users);
    });
  });

  return router;
}
