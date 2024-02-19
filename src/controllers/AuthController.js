import User from "../models/UserModels.js";
import { generateToken } from "../helpers/generateToken.js"; 
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 
    // Validation
    if (!email || !password) {
      console.log("Email:", email); // Logging email only
      return res.status(400).json({
        success: false,
        message: "Invalid email or password", 
      });
    }

    // search by email
    const userByEmail = await User.findOne({ email });
    if (!userByEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, userByEmail.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create token
    const token = generateToken(userByEmail);


    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: userByEmail._id,
        email: userByEmail.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};
