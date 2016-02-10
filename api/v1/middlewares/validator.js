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
        driver: Joi.types.Boolean()
      }
    },
    userLocation:{
      patch:{
        driver: Joi.types.String(),
        name: Joi.types.String().max(30),
        location:{
          coordinates: Joi.types.Array(),
        }
      }
    },
    drivers:{
      setLocation:{
        driver: Joi.string().required(),
        location: Joi.object({
          longitude: Joi.number().required(),
          latitude: Joi.number().required()
        }).required()
      },
      set:{
        user: Joi.string().length(24).required()
      },
      unset:{
        user: Joi.string().length(24).required()
      }
    }
  }
}