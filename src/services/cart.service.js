import { cartModel } from '../models/cart.model';

const create = async (req, res) => {
  try {
    const result = await cartModel.create(req);
    return result;
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const result = await cartModel.get(req);
    return result;
  } catch (error) {}
};

const getByUser = async (id) => {
  try {
    const result = await cartModel.getByUser(id);
    return result;
  } catch (error) {}
};
export const cartService = { get, getByUser, create };
