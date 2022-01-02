import { productModel } from '../models/product.model';

const create = async (req, res) => {
  try {
    const result = await productModel.create(req);
    return result;
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const result = await productModel.get(req);
    return result;
  } catch (error) {}
};

const getProduct = async (id) => {
  try {
    const result = await productModel.getProduct(id);
    return result;
  } catch (error) {}
};

export const productService = { create, get, getProduct };
