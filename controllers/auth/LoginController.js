import { UserModel } from "../../models/UserModel.js"; // Replace with the actual User model import
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const LoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: username }, { mobile_number: username }],
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15d", // Token expiration time (adjust as needed)
    });

    res
      .status(200)
      .json({ token, type: user.type, message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default LoginController;
