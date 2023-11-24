import DealsModel from "../../models/DealsModel.js";

const createDeals = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile_number,
      bookingDate,
      returnDate,
      itemId,
      farmerId,
      itemType,
      partnerId
    } = req.body;
    console.log(req.body)

    const status = "Pending";

    const newDeal = new DealsModel({
      name,
      email,
      mobile_number,
      bookingDate,
      returnDate,
      itemId,
      farmerId,
      itemType,
      partnerId,
      status, // Include the status field
    });

    await newDeal.save();

    console.log("Deal created:", newDeal);

    res.status(201).json({
      message: "Deal created successfully",
      deal: newDeal,
    });
  } catch (error) {
    console.error("Error in creating deal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createDeals;
