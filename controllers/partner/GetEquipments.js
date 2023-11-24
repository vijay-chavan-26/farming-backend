import Partner from "../../models/PartnerModel.js";

const GetEquipments = async (req, res) => {
  try {
    const partners = await Partner.find({});
    res.status(200).json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default GetEquipments