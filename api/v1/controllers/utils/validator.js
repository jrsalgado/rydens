module.exports= validator;
validator.$inject = ['expressJoi'];

function validator(expressJoi){
  var Joi = expressJoi.Joi;
  return{
    users:{
      post:{
        name: Joi.types.String().max(30),
        lastName: Joi.types.String(),
        nsApiId: Joi.types.String(),
        age: Joi.types.Number(),
        motorist: Joi.types.Boolean()
      }
    },
    userLocation:{
      patch:{
        motorist: Joi.types.String(),
        name: Joi.types.String().max(30),
        location:{
          coordinates: Joi.types.Array(),
        }
      }
    }
  }
}