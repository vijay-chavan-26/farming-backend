import fs from "fs/promises";
import Partner from "../../models/PartnerModel.js";
import cloudinary from "cloudinary";
import { UserModel } from "../../models/UserModel.js";

const AddEquipmentController = async (req, res) => {
  try {
    const { name, desc, type, status, partnerId, price, totalQuantity } = req.body;
console.log({ name, desc, type, status, partnerId, price, totalQuantity })
    cloudinary.config({
      cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
      api_key: process.env.CLOUDNARY_CLOUD_API,
      api_secret: process.env.CLOUDNARY_CLOUD_SECRET,
    });

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Upload file to Cloudinary
    const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
      tags: "partner_image",
    });

    // Delete the local file
    await fs.unlink(req.file.path);

    const existingUser = await UserModel.findById(partnerId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User not found with the provided partnerId" });
    }

    // Create a new Partner object with the information
    const newPartner = new Partner({
      name,
      desc,
      type,
      status,
      price,
      partnerId,
      totalQuantity, // Assuming totalQuantity is sent from the client
      availableQuantity: totalQuantity, // Initially, all quantity is available
      imageUrl: uploadedFile.secure_url,
    });

    // Save the new Partner to MongoDB
    const savedPartner = await newPartner.save();
    console.log(savedPartner)

    // Return the saved Partner data as a response
    res.status(201).json({ message: "Equipment Added Successfully!", data: savedPartner });
  } catch (error) {
    console.error("Error in adding equipment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default AddEquipmentController;
