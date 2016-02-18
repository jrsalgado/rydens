'use strict';

module.exports = motoristsMiddlewares;

function motoristsMiddlewares(UserModel) {

  return {
    fetchAllMotorists: fetchAllMotorists,
    setAsMotorist: setAsMotorist,
    getById: getById,
    setLocationById: setLocationById
  }
  
  function fetchAllMotorists(req, res){
    return UserModel.findAsync({ motorist: true });;
  }
  
  function setAsMotorist(req, res){
    return UserModel.updateAsync({_id: req.params.id},{motorist:true});
  }
  
  function getById(req, res){
    return UserModel.findByIdAsync(req.params.id)
  }
  
  function setLocationById(req, res){
    var coords; 
    if(!req.body.coordinates.latitude  || !req.body.coordinates.longitude ){ 
      throw new Error("required coordinates");
     }
    
    coords = req.body.coordinates;
    return UserModel.updateAsync({ _id: req.params.id },{
        location:{
          coordinates:[coords.latitude, coords.longitude]
        }
      });
  }
  
}