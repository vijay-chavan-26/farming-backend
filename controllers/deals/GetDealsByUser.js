import DealsModel from "../../models/DealsModel.js";

const GetDealsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const deals = await DealsModel.find({
        $or: [{ farmerId: userId }, { partnerId: userId }],
      });

    res.status(200).json({
      message: 'Deals retrieved successfully',
      deals: deals,
    });
  } catch (error) {
    console.error('Error fetching deals by user ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default GetDealsByUserId;
