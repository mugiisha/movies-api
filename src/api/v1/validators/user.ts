import Joi from "joi";

export const signupSchema = Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required().messages({
    'string.email': `you provided an invalid email address`,
  }),
password: Joi.string().required(),
})