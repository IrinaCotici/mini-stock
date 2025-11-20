import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/ministock?authSource=admin';

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};

