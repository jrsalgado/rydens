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
  
  // DRIVER LOCATION
  router.get('/location/:driver', function(req, res){
    User.findOne({name: req.params.driver, driver:true},function(err, user){
      if(!!err){ res.status(400).send(err)}
      res.send(user);
    });
  });
  
  router.patch('/location/:driver', expressJoi.joiValidate(validator.userLocation.patch),function(req, res){
    User.update({name:req.params.driver}, { location:req.body.location}, function(err, result){
      if(!err && result.nModified === 1) {
        console.log(result);
        res.send('ok');
      }else{
        res.status(400).send(err);
      }
    });
  })
  
  return router;
}
