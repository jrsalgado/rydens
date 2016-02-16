'use strict';
module.exports = mainRouter;
mainRouter.$inject = ['express'];

function mainRouter(express){
  var router = express.Router();
  
  router.get('/', function(req, res){
   res.send('main route');
  });
  
  return router;
}
