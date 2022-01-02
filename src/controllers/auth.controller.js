import { authService } from '../services/auth.service';
const create = async (req, res) => {
  try {
    const result = await authService.create(req.body);
    const status = result.status;
    delete result.status;
    res.status(status).json(result);
    
  } catch (error) {
    res.status(400).json({ message: 'Error Controller' });
  }
};

export const authController = { create };
