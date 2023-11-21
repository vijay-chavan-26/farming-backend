import jwt from "jsonwebtoken";
import {UserModel} from "../../models/UserModel.js"; // Import the User model or adjust the import path

const VerifyController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.json({ error: "Token verification failed" });
    }

    try {
      // Token is valid, fetch user details from the database
      const user = await UserModel.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "Token verified successfully", user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

export default VerifyController;
