import DealsModel from "../../models/DealsModel.js";



const GetAllDeals = async (req, res) => {
  try {
    const deals = await DealsModel.find({});
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching partners:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default GetAllDeals