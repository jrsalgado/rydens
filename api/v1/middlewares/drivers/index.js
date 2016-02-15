'use strict';

module.exports = driversCtrls;
driversCtrls.$inject = ['model.user', 'q'];

function driversCtrls(User, Q) {

  return {
    fetchAllDrivers: fetchAllDrivers,
    setAsDriver: setAsDriver
  }
  
  function fetchAllDrivers(req, res){
    var def = Q.defer();
    User.find({ driver: true }, function(err, drivers){
      if(!!err){
        def.reject(err);
      }else{
        def.resolve(drivers);
      }
    });
    return def.promise;
  }
  
  function setAsDriver(req, res){
    var query, promise, def = Q.defer();
    
    query = User.findOne({_id: req.params.id});
    promise = query.exec();
    query.then(success, error);
    
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
