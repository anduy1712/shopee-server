require('dotenv').config();

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  ACCESS_TOKEN_SECET: process.env.ACCESS_TOKEN_SECET
};
