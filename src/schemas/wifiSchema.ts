import joi from 'joi';

export const wifiSchema = joi.object({
  title: joi.string().trim().min(1).required(),
  name: joi.string().trim().min(1).required(),
  password: joi.string().min(4).required()
});