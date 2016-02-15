'use strict';

module.exports = driversCtrls;

function driversCtrls(UserModel) {

  return {
    fetchAllDrivers: fetchAllDrivers,
    setAsDriver: setAsDriver
  }
  
  function fetchAllDrivers(req, res){
    return UserModel.findAsync({ driver: true });;
  }
  
  function setAsDriver(req, res){
    return UserModel.findOneAsync({_id: req.params.id});
  }
  
}
