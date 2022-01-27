import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';

export const productCollectionName = 'product';
const productSchema = Joi.object({
  title: Joi.string().min(3).max(50).trim().required(),
  price: Joi.number().required(),
  images: Joi.array().items(Joi.string()).default([]),
  quantites: Joi.number().max(999).required(),
  description: Joi.string().min(3).trim().required(),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
  try {
    return await productSchema.validateAsync(data, {
      abortEarly: false
    });
  } catch (err) {}
};

const create = async (req, res) => {
  try {
    const value = await validateSchema(req);
    //call mongodb
    const result = await getDB()
      .collection(productCollectionName)
      .insertOne(value);
    const resultFinal = await getDB()
      .collection(productCollectionName)
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
      .collection(productCollectionName)
      .find({})
      .toArray();
    return result;
  } catch (error) {}
};

const getProduct = async (id) => {
  try {
    const result = await getDB()
      .collection(productCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {}
};

export const productModel = { create, get, getProduct };
