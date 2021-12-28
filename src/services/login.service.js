import * as argon2 from 'argon2';
import jsonwebtoken from "jsonwebtoken";
import { env } from "../config/environtment";
import { authModel } from '../models/auth.model';

const create = async (req, res) => {
  const { password } = req;
  try {
    const User = await authModel.get();
    //USER FAIL
    if (!User) return res.status(400).json({ messge: 'username error' });

    //PASSWORD FAIL
    const passwordVerify = await argon2.verify(User.password, password);
    if (!passwordVerify)
      return res.status(400).json({ message: 'password error' });

    //GET TOKEN
    const accessToken = jsonwebtoken.sign(
      { userId: User._id },
      env.ACCESS_TOKEN_SECET
    );
    return res.status(200).json({ message: 'Login successfully', accessToken });
  } catch (error) {}
};

export const loginService = { create };
