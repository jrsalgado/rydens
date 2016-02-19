'use strict';
module.exports = motoristsCtrls;

function motoristsCtrls(motoristsMiddlewares) {
  
  return {
    fetchAll: fetchAll,
    setAsDriver: setAsDriver
  }
  
  function fetchAll(req, res, next){
    return motoristsMiddlewares.fetchAllDrivers(req,res)
    .then( res.json.bind(res) )
    .catch( next );
  }
  
  function setAsDriver(req, res, next){
    return motoristsMiddlewares.setAsDriver(req, res)
    .then( res.json.bind(res) )
    .catch(next)
  }
  
}
