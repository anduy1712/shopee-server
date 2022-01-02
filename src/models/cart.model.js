import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';

const cartCollectionName = 'cart';
const cartSchema = Joi.object({
  userId: Joi.string(),
  products: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  try {
    return await cartSchema.validateAsync(data, {
      abortEarly: false
    });
  } catch (err) {}
};

const create = async (req, res) => {
  try {
    const value = await validateSchema(req);
    //call mongodb
    const result = await getDB()
      .collection(cartCollectionName)
      .insertOne(value);
    const resultFinal = await getDB()
      .collection(cartCollectionName)
      .findOne(result.insertedId);
    return resultFinal;
  } catch (error) {
    res.status(200).json({ message: 'error create model' });
  }
};

const get = async (req, res) => {
  try {
    //call mongodb
    const result = await getDB()
      .collection(cartCollectionName)
      .find({})
      .toArray();
    return result;
  } catch (error) {}
};


export const cartModel = {  get };
