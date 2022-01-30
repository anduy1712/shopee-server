import { cartModel } from '../models/cart.model';
import { Request, Response } from 'express';

const create = async (req?: Request, res?: Response) => {
  try {
    const result = await cartModel.create(req);
    return result;
  } catch (error) {}
};

const get = async (req?: Request, res?: Response) => {
  try {
    const result = await cartModel.get(req);
    return result;
  } catch (error) {}
};

const update = async (req?: Request, id?: any) => {
  try {
    const result = await cartModel.update(req, id);
    return result;
  } catch (error) {}
};

const getByUser = async (id) => {
  try {
    const result = await cartModel.getByUser(id);
    return result;
  } catch (error) {}
};
export const cartService = { get, getByUser, create, update };
