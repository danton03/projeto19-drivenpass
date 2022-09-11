import joi from 'joi';

export const credentialSchema = joi.object({
  url: joi.string().uri().required(),
  username: joi.string().trim().min(1).required(),
  password: joi.string().trim().required(),
  title: joi.string().trim().min(1).required()
});