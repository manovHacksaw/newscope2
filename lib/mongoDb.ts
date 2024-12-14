import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // Use Mongoose's connect method with the MONGO_URI environment variable
    const conn = await mongoose.connect(process.env.MONGO_DB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1); // Exit process with failure code
  }
};

export default connectDB;
