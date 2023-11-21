// Import necessary packages
import mongoose from "mongoose";

// Define the Partner schema
const partnerSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
});

// Create the Partner model
const Partner = mongoose.model("Partner", partnerSchema);

// Export the Partner model
export default Partner;
