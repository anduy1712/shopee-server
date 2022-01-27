import Joi from 'joi';

const create = async (req, res, next) => {
  const condition = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(Joi.object()).default([])
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
  }
};

export const cartValidation = { create };
