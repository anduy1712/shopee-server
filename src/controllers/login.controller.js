import { loginService } from '../services/login.service';
const create = async (req, res) => {
  try {
    const result = await loginService.create(req.body);
    return result;
  } catch (error) {
    res.status(400).json({ message: 'Error Controller' });
  }
};

export const loginController = { create };
