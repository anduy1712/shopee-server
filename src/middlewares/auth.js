import jsonwebtoken from 'jsonwebtoken';
import { env } from '../config/environtment';

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Access Token Not Found' });

  try {
    const decoded = jsonwebtoken.verify(token, env.ACCESS_TOKEN_SECET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalid' });
  }
};

export default verifyToken;
