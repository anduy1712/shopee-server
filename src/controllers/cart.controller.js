import { cartService } from '../services/cart.service';
import { httpStatusCode } from '../utilities/constant';

const get = async (req, res) => {
  try {
    const result = await cartService.get();
    res.status(httpStatusCode.OK).json(result);
    return result;
  } catch (error) {}
};


export const cartController = {  get };
