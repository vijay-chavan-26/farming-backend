import Partner from "../../models/PartnerModel.js";

const ChangeEquipmentStatus = async (req, res) => {
  try {
    const { itemId, status } = req.body;
console.log(itemId, status)
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    // Find the equipment by itemId and update its status
    const equipment = await Partner.findOneAndUpdate(
      { _id: itemId }, // Assuming _id is the field you're matching against
      { status: status },
      { new: true } // To return the updated document
    );

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.status(200).json(equipment);
  } catch (error) {
    console.error("Error changing equipment status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default ChangeEquipmentStatus;
