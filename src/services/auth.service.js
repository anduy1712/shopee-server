import * as argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import { authModel } from '../models/auth.model';
const create = async (req, res) => {
  try {
    const Users = await authModel.get();

    //USER FAIL
    const user = await Users.findOne({ username: req.username });
    if (user) return { status: 400, success: false, message: 'user co roi' };

    const password = await argon2.hash(req.password);
    const value = await authModel.create({ ...req, password });
    const accessToken = jsonwebtoken.sign(
      { userId: value._id },
      '2wdsf4t34232reh564gvs'
    );
    return { status: 200, success: true, accessToken, message: 'user created' };
  } catch (error) {
    res.status(400).json({ error: new Error(error).message });
  }
};

export const authService = { create };
