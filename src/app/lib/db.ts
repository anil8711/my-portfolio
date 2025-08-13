import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables.");
}

let isConnected = false; // Prevent multiple connections

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: "Contact-us", // Optional: set your DB name here
      });
      isConnected = true;
      console.log("✅ MongoDB connected successfully");
    } else {
      console.log("✅ MongoDB already connected (via mongoose state)");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
