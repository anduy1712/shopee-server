import Joi from 'joi';
import { getDB } from '../config/mongodb';

const authCollectionName = 'auth';
const authSchema = Joi.object({
  username: Joi.string().min(6).max(20).trim().required(),
  password: Joi.string().min(6).trim().required(),
  numberPhone: Joi.number().min(10).max(10).default(null),
  email:Joi.string().trim().default(null),
  firstName: Joi.string().trim().default(''),
  lastName: Joi.string().trim().default(''),
  photoImage: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  try {
    return await authSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    res.status(400).json({ message: 'error model 2' });
  }
};

const create = async (req, res) => {
  try {
    const value = await validateSchema(req);
    //call mongodb
    const result = await getDB()
      .collection(authCollectionName)
      .insertOne(value);
    const resultFinal = await getDB()
      .collection(authCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    res.status(400).json({ message: 'error model' });
  }
};

const get = async (req, res) => {
  try {
    //call mongodb
    return await getDB().collection(authCollectionName);
  } catch (error) {
    res.status(400).json({ message: 'Error model' });
  }
};

export const authModel = { create, get };
