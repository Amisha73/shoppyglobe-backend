const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
// import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(bodyParser.json());

// database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
