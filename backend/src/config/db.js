const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Removed useNewUrlParser and useUnifiedTopology options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
