import mongoose from 'mongoose';
import config from './index';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbPath);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
