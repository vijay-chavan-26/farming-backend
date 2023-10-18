import { UserModel } from "../../models/UserModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SignupController = async (req, res) => {
  try {
    const { name, email, mobile_number, password, type } = req.body;

    // Check if the email or mobile_number already exists in the database
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { mobile_number }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this email or mobile_number already exists",
        });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      mobile_number,
      password: hashedPassword,
      type
    });

    // Save the new user to the database
    await newUser.save();

    // Remove the password field from the user object before sending it in the response
    const userWithoutPassword = { ...newUser._doc };
    delete userWithoutPassword.password;

    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default SignupController;
