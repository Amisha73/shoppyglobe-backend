const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/shoppyglobe");

const db = mongoose.connection;
db.on("open", ()=>{
    console.log("Connected to MongoDB");
});
db.on("error",()=>{
    console.log("Error connecting to MongoDB");
})

// Routes
app.use("/auth",authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
