import joi from 'joi';

export const authSchema = joi.object({
  email: joi.string().email().required(), 
  password: joi.string().trim().min(10).required(),
});
