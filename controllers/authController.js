const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler
exports.registerUser = async (req, res) => {
  try {
    //get data
    const { username, name, email, password } = req.body;
    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error inn hashing Password",
      });
    }

    //create entry for User
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

// login
exports.loginUser = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;

    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "PLease fill all the details carefully",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Compare provided password with hashed password stored
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
    // Prepare token payload
    const payload = {
      email: user.email,
      id: user._id,
    };
    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
