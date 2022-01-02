import { cartModel } from '../models/cart.model';

const get = async (req, res) => {
  try {
    const result = await cartModel.get(req);
    return result;
  } catch (error) {}
};

export const productService = { get };
