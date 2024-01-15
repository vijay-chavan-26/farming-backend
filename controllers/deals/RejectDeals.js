import mongoose from "mongoose";
import DealsModel from "../../models/DealsModel.js";
import Partner from "../../models/PartnerModel.js";

const RejectDeals = async (req, res) => {
  try {
    const { dealId } = req.body;

    if (!dealId) {
      return res.status(400).json({ error: 'Deal ID is required' });
    }

    const updatedDeal = await DealsModel.findByIdAndUpdate(
      dealId,
      { status: 'Rejected' },
      { new: true } // Return the modified document
    );
    
    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    const item = await Partner.findById(updatedDeal.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    let sum = 0;
    item.unavailableDates = item.unavailableDates.filter((dateRange) => {
      console.log(dateRange.dealId.equals(updatedDeal._id));
if (dateRange.dealId.equals(updatedDeal._id)) {
        sum += parseInt(dateRange.qty);
        return false;
      }
      return true;
    });
    item.availableQuantity = parseInt(item.availableQuantity) + sum;
    await item.save();

    console.log('Deal Rejected:', updatedDeal);

    res.status(200).json({
      message: 'Deal Rejected successfully',
      deal: updatedDeal,
    });
  } catch (error) {
    console.error('Error accepting deal:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default RejectDeals;
