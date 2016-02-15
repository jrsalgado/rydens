'use strict';

module.exports = driversCtrls;

function driversCtrls(UserModel) {

  return {
    fetchAllDrivers: fetchAllDrivers,
    setAsDriver: setAsDriver
  }
  
  function fetchAllDrivers(req, res){
    var promise;
    
    promise = UserModel.findAsync({ driver: true });
    promise.then(success);
    promise.catch(error);
    
    function success(drivers){
      return drivers;
    }
    
    function error(err){
      return err;
    }
    
    return promise;
  }
  
  function setAsDriver(req, res){
    var promise;
    
    promise = UserModel.findOneAsync({_id: req.params.id});
    promise.then(success);
    promise.catch(error);

    function success(user){
      if(!user){
        return user;
      }else{
        user.driver = true;
        user.save();
        return user;
      }
    }

    function error(err){
      return error;
    }
    
    return promise;
  }
  
}
