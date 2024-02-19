import User from "../models/UserModels.js";
import { comparePassword } from "./passwordUtils.js"; // Assuming you have a password utility function
import { generateToken } from "./tokenUtils.js"; // Assuming you have token utility function
import Session from "../models/SessionModels.js"; // Assuming you have a Session model
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // Validation
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid identifier or password",
      });
    }

    let authenticatedUser = null;

    // search by mail
    const userByEmail = await User.findOne({ email: identifier });
    if (userByEmail) {
      const match = await comparePassword(password, userByEmail.password);
      if (match) {
        authenticatedUser = userByEmail;
      }
    }

    // if == null search user by name
    if (!authenticatedUser) {
      const users = await User.find({ name: identifier });

      for (const user of users) {
        const match = await comparePassword(password, user.password);
        if (match) {
          authenticatedUser = user;
          break;
        }
      }
    }

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }


    // create token
    const token = generateToken(authenticatedUser);
    await authenticatedUser.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: authenticatedUser._id,
        email: authenticatedUser.email,
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
