'use strict';
module.exports = driversCtrls;

function driversCtrls(driversMiddlewares) {
  
  return {
    fetchAll: fetchAll,
    setAsDriver: setAsDriver
  }
  
  function fetchAll(req, res, next){
    return driversMiddlewares.fetchAllDrivers(req,res)
    .then( res.json.bind(res) )
    .catch( next );
  }
  
  function setAsDriver(req, res, next){
    return driversMiddlewares.setAsDriver(req, res)
    .then( res.json.bind(res) )
    .catch(next)
  }
  
}
