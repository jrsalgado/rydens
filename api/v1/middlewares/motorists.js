'use strict';

module.exports = motoristsMiddlewares;

function motoristsMiddlewares(UserModel) {

  return {
    fetchAllMotorists: fetchAllMotorists,
    setAsMotorist: setAsMotorist,
    getById: getById,
    setLocationById: setLocationById,
    unsetAsMotorist: unsetAsMotorist
  }
  
  function fetchAllMotorists(req, res){
    return UserModel.findAsync({ motorist: true });;
  }
  
  function setAsMotorist(req, res){
    if(!req.params ||!req.params.id){
      throw new Error("id is missing")
    }
    return UserModel.updateAsync({_id: req.params.id},{motorist:true});
  }
  
  function unsetAsMotorist(req, res){
    if(!req.params ||!req.params.id){
      throw new Error("id is missing")
    }
    return UserModel.updateAsync({_id: req.params.id},{motorist:false});
  }

  function getById(req, res){
    if(!req.params ||!req.params.id){
      throw new Error("id is missing")
    }
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