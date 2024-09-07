import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    // Check if Mongoose is already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Mongoose already connected");
      return;
    }

    // Get MongoDB URI from environment variables
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MongoDB connection string is not defined");
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    console.log("Mongoose connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default DbConnect;
