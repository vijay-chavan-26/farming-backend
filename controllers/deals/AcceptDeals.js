import DealsModel from "../../models/DealsModel.js";

const AcceptDeals = async (req, res) => {
  try {
    const { dealId } = req.body;

    if (!dealId) {
      return res.status(400).json({ error: 'Deal ID is required' });
    }
    
    const updatedDeal = await DealsModel.findByIdAndUpdate(
      dealId,
      { status: 'Accepted' },
      { new: true } 
      );

    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    console.log('Deal accepted:', updatedDeal);

    res.status(200).json({
      message: 'Deal accepted successfully',
      deal: updatedDeal,
    });
  } catch (error) {
    console.error('Error accepting deal:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default AcceptDeals;
