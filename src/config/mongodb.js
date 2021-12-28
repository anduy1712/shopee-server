import { MongoClient } from 'mongodb';
import { env } from './environtment';
require('dotenv').config();

let dbInstance = null;

// Database Name

export const connectDb = async () => {
  const client = new MongoClient(env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  // Connection URL
  await client.connect();
  dbInstance = client.db(env.DATABASE_NAME);
};

//Get database instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first');
  return dbInstance;
};
