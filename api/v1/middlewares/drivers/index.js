'use strict';

module.exports = driversCtrls;
driversCtrls.$inject = ['model.user', 'q'];

function driversCtrls(User, Q) {

  return {
    fetchAllDrivers: fetchAllDrivers
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
  
}
