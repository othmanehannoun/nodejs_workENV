// VALIDATION
const Joi = require("joi");

//Login validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
  });
  return schema.validate(data);
};



//Register Individeul

const registerValidationIndivideul = data => {
  const schema = Joi.object({
    telephone:Joi.string().pattern(/^[0-9]+$/).required()
  });
  return schema.validate(data);
};
module.exports ={loginValidation, registerValidationIndivideul};
