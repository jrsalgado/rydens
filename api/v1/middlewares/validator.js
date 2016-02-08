module.exports= validator;
validator.$inject = ['expressJoi'];

function validator(expressJoi){
  var Joi = expressJoi.Joi;
  return{
    users:{
      post:{
        name: Joi.types.String().max(8),
        lastName: Joi.types.String(),
        nsApiId: Joi.types.String(),
        age: Joi.types.Number(),
        driver: Joi.types.Boolean()
      }
    }
  }
}