'use strict';
module.exports = usersRouter;
usersRouter.$inject = ['express'];

function usersRouter(express){
  var router = express.Router();
  
  router.get('/position/last/:chofer', function(req, res){
   res.send(req.params);
  });
  
  return router;
}
