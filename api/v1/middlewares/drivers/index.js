'use strict';

module.exports = driversCtrls;
driversCtrls.$inject = ['model.user', 'q'];

function driversCtrls(User, Q) {

  return {
    fetchAllDrivers: fetchAllDrivers,
    setAsDriver: setAsDriver
  }
  
  function fetchAllDrivers(req, res){
    var query, promise, def = Q.defer();
    
    query = User.find({ driver: true });
    promise = query.exec();
    promise.then(success, error);
    
    function success(drivers){
      def.resolve(drivers);
    }
    
    function error(err){
      def.reject(err);
    }
    
    return def.promise;
  }
  
  function setAsDriver(req, res){
    var query, promise, def = Q.defer();
    
    query = User.findOne({_id: req.params.id});
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
