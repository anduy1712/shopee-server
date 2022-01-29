import { productService } from '../services/product.service';
import { httpStatusCode } from '../utilities/constant';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
  try {
    const result = await productService.create(req.body);
    res.status(200).json({ message: 'Create Product success' });
    return result;
  } catch (error) {}
};

const get = async (req: Request, res: Response) => {
  try {
    const result = await productService.get();
    res.status(httpStatusCode.OK).json(result);
    return result;
  } catch (error) {}
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await productService.getProduct(id);
    res.status(httpStatusCode.OK).json(result);
    return result;
  } catch (error) {}
};

export const productController = { create, get, getProduct };
