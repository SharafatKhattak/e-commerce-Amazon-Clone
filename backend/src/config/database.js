import mongoose from 'mongoose';

export const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
      return;
    } catch (error) {
      retries++;
      console.log(`❌ MongoDB connection failed (attempt ${retries}/${maxRetries})`);
      console.error(error.message);
      
      if (retries < maxRetries) {
        console.log(`Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  console.error('Failed to connect to MongoDB after maximum retries');
  process.exit(1);
};
