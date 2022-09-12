import joi from 'joi';

export const cardSchema = joi.object({
  title: joi.string().trim().min(1).required(),
  name:joi.string().trim().min(1).required(),
  number: joi.string().pattern(/^[0-9]{16}$/).required(),
  cvc: joi.string().pattern(/^[0-9]{3}$/).required(),
  password: joi.number().required(),
  expirationDate: joi.string().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "credit_and_debit").required()
});