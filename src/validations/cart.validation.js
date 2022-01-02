import Joi from 'joi';

const create = async (req, res, next) => {
  const condition = Joi.object({
    userId: Joi.string(),
    products: Joi.array().items(Joi.string()).default([]),
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
  }
};

export const cartValidion = { create };
