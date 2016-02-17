'use strict';
module.exports = motoristsRouter;

function motoristsRouter(express, validator, expressJoi, motoristsCtrls){
   var router = express.Router();
   
   router.get('/', motoristsCtrls.fetchAll);
   
   router.patch('/location/:motorist',expressJoi.joiValidate(validator.userLocation.patch));
   router.patch('/location/:motorist', motoristsCtrls.setAsDriver);
   return router;
}
