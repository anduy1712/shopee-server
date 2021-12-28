import { authService } from '../services/auth.service';
const create = async (req, res) => {
  try {
    const result = await authService.create(req.body);
    res
      .status(200)
      .json({ message: 'User created', accessToken: result.accessToken });
    return result;
  } catch (error) {
    res.status(400).json({ message: 'Error Controller' });
  }
};

export const authController = { create };
