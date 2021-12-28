import * as argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import { authModel } from '../models/auth.model';
const create = async (req, res) => {
  try {
    const password = await argon2.hash(req.password);
    const value = await authModel.create({ ...req, password });
    const accessToken = jsonwebtoken.sign(
      { userId: value._id },
      '2wdsf4t34232reh564gvs'
    );
    console.log(value);
    return { ...value, accessToken };
  } catch (error) {
    res.status(400).json({ error: new Error(error).message });
  }
};

export const authService = { create };
