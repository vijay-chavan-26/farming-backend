import DealsModel from "../../models/DealsModel.js";
import Partner from "../../models/PartnerModel.js";


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
      partnerId,
      bookedQuantity,
    } = req.body;

    const status = "Pending";

    const partner = await Partner.findById(itemId);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    console.log(partner)
console.log(partner.availableQuantity ,bookedQuantity)
console.log(partner.availableQuantity < bookedQuantity)
    if (partner.availableQuantity < bookedQuantity) {
      return res.status(400).json({ error: "Not enough quantity available" });
    }

    partner.availableQuantity -= bookedQuantity;

    
    // Create a new Deal object with the information
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
      bookedQuantity,
      status,
    });
    await newDeal.save();
    console.log("Deal created:", newDeal);
    
    partner.unavailableDates.push({
      startDate: bookingDate,
      endDate: returnDate,
      qty: bookedQuantity,
      dealId: newDeal._id 
    });

    const data = await partner.save();
    console.log("data", data)


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
