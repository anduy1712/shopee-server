import { loginService } from '../services/login.service';
import { httpStatusCode } from '../utilities/constant';

const create = async (req, res) => {
  try {
    const result = await loginService.create(req.body);
    const status = result.status;
    delete result.status;
    res.status(status).json(result);
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: new Error(error).message });
  }
};

const get = async (req, res) => {
  try {
    const result = await loginService.get(req);
    const status = result.status;
    delete result.status;
    res.status(status).json(result);
  } catch (error) {
    res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: new Error(error).message });
  }
};

export const loginController = { create, get };
