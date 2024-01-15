// Import necessary packages
import mongoose from "mongoose";

// Define the Partner schema
const partnerSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: { type: String, required: true },
  totalQuantity: {
    type: String,
    required: true,
  },
  availableQuantity: {
    type: String,
    required: true,
  },
  unavailableDates: [
    {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      qty: { type: String, required: true },
      dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deals",
        required: true,
      },
    },
  ],
});

// Create the Partner model
const Partner = mongoose.model("partners", partnerSchema);

// Export the Partner model
export default Partner;
