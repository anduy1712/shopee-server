import * as argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { env } from '../config/environtment';
import { authModel } from '../models/auth.model';

const create = async (req, res) => {
  const { username, password } = req;
  try {
    const Users = await authModel.get();

    //USER FAIL
    const user = await Users.findOne({ username });

    if (!user) return { status: 400, success: false, message: 'user error' };

    //PASSWORD FAIL
    const passwordVerify = await argon2.verify(user.password, password);
    if (!passwordVerify)
      return { status: 400, success: false, message: 'password error' };

    //GET TOKEN
    const accessToken = jsonwebtoken.sign(
      { userId: user._id },
      env.ACCESS_TOKEN_SECET
    );
    return {
      status: 200,
      success: true,
      message: 'Login successfully',
      accessToken: accessToken
    };
  } catch (error) {}
};

const get = async (req, res) => {
  try {
    const Users = await authModel.get();
    const user = await Users.findOne({ _id: ObjectId(req.userId) });
    delete user.password;
    delete user._destroy;
    if (!user)
      return { status: 400, success: false, message: 'Cannot get user' };
    return {
      status: 200,
      success: true,
      message: 'Get User Successfuly',
      user
    };
  } catch (error) {}
};

export const loginService = { create, get };
