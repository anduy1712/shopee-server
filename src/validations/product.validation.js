import Joi from 'joi';

const create = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
    price: Joi.number().required(),
    images: Joi.array().items(Joi.string()).default([]),
    quantites: Joi.number().max(999).required(),
    description: Joi.string().min(3).max(200).required()
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
  }
};

export const productValidion = { create };
