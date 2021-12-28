import Joi from 'joi';
const create = async (req, res, next) => {
  const condition = Joi.object({
    username: Joi.string().min(6).max(20).trim().required(),
    password: Joi.string().min(6).trim().required()
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: new Error(error).message });
  }
};

export const authValidate = { create };
