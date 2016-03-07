module.exports= validator;
validator.$inject = ['expressJoi'];

function validator(expressJoi){
  var Joi = expressJoi.Joi;
  return{
    users:{
      post:{
        name: Joi.types.String().max(30).required(),
        lastName: Joi.types.String().max(30).required(),
        nsApiId: Joi.types.String().optional(),
        age: Joi.types.Number().required(),
        motorist: Joi.types.Boolean()
      },
      urlId:{
        id: Joi.types.String().length(24).required()
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