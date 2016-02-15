'use strict';

module.exports = driversCtrls;

function driversCtrls(UserModel, q) {

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
    var query, promise, def = q.defer();
    
    query = UserModel.findOne({_id: req.params.id});
    promise = query.exec();
    promise.then(success, error);
    
    function success(user){
      if(!user){
        def.reject({msg: "user not found"});
      }else{
        user.driver = true;
        user.save();
        def.resolve(user);
      }
    }

    function error(err){
      def.reject(err);
    }

    return def.promise;
  }
  
}
