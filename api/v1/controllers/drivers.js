'use strict';
module.exports = driversCtrls;

function driversCtrls(driversMiddlewares) {
  
  return {
    fetchAll: fetchAll,
    setAsDriver: setAsDriver
  }
  
  function fetchAll(req, res, next){
    driversMiddlewares.fetchAllDrivers(req,res)
    .then(function success(drivers){
      res.json(drivers);
    })
    .catch(function error(err){
      next(err);
    });
  }
  
  function setAsDriver(req, res, next){
    driversMiddlewares.setAsDriver(req, res)
    .then(function success(result){
      res.json(result);
    })
    .catch(function error(err){
      next(err);
    })
  }
  
}
