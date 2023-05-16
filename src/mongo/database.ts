import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DB_CONTAINER_NAME ? process.env.DB_CONTAINER_NAME : "localhost"}:27017`);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
