import mongoose from "mongoose";
import Partner from "../../models/PartnerModel.js";

const GetEquipmentsByID = async (req, res) => {
  const { id } = req.params;
  try {
    const partner = await Partner.find({partnerId: id});

    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    console.log(partner)
    res.status(200).json(partner);
  } catch (error) {
    console.error("Error fetching partner:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetEquipmentsByID;
