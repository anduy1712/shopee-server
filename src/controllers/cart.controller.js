import { cartService } from '../services/cart.service';
import { httpStatusCode } from '../utilities/constant';

const create = async (req, res) => {
  try {
    const result = await cartService.create(req.body);
    res.status(200).json(result);
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const result = await cartService.get();
    res.status(httpStatusCode.OK).json(result);
  } catch (error) {}
};

const getByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartService.getByUser(id);
    res.status(httpStatusCode.OK).json(result);
  } catch (error) {}
};
export const cartController = { get, getByUser, create };
