'use strict';

module.exports = motoristsMiddlewares;

function motoristsMiddlewares(UserModel) {

  return {
    fetchAllMotorists: fetchAllMotorists,
    setAsMotorist: setAsMotorist,
    getById: getById
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
  
}