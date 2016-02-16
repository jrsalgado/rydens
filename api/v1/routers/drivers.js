'use strict';
module.exports = driversRouter;

function driversRouter(express, validator, expressJoi, driversCtrls){
   var router = express.Router();
   
   router.get('/', driversCtrls.fetchAll);
   
   router.patch('/location/:driver',expressJoi.joiValidate(validator.userLocation.patch));
   router.patch('/location/:driver', driversCtrls.setAsDriver);
   return router;
}
