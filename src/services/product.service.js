import { productModel } from '../models/product.model';

const create = async (req, res) => {
  try {
    const result = await productModel.create(req);
    return result;
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const result = await productModel.get();
    return result;
  } catch (error) {}
};

export const productService = { create, get };
