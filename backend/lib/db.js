import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to Mongo DB ${error}`);
    process.exit(1); // 1 ~ Failure & 0 ~ Success
  }
};
