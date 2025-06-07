const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL; // Ensure this is defined

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
