import { cartService } from '../services/cart.service';
import { httpStatusCode } from '../utilities/constant';
import { Request, Response } from 'express';
const create = async (req: Request, res: Response) => {
  try {
    const result = await cartService.create(req.body);
    res.status(200).json(result);
  } catch (error) {}
};

const get = async (req: Request, res: Response) => {
  try {
    const result = await cartService.get();
    res.status(httpStatusCode.OK).json(result);
  } catch (error) {}
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await cartService.update(req.body, id);
    res.status(httpStatusCode.OK).json(result);
  } catch (error) {}
};

const getByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await cartService.getByUser(id);
    console.log(result);
    res.status(httpStatusCode.OK).json(result);
  } catch (error) {}
};
export const cartController = { get, getByUser, create, update };
