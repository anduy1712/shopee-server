import { productService } from '../services/product.service';
import { httpStatusCode } from '../utilities/constant';

const create = async (req, res) => {
  try {
    const result = await productService.create(req.body);
    req.status(200).json({ message: 'Create Product success' });
    return result;
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const result = await productService.get();
    res.status(httpStatusCode.OK).json(result);
    return result;
  } catch (error) {}
};

export const productController = { create, get };
