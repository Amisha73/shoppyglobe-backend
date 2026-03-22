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
  .connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() =>{
    console.log("Db is connected successfully");
}).catch((error) =>{
    console.log("Db is not Connected");
    console.error(error);
    process.exit(1);
});
// mongoose.connect('mongodb://mongodb:27017/my_database');
// console.log()

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
