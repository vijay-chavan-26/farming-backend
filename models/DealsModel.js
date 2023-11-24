// Import necessary packages
import mongoose from "mongoose";

// Define the Deals schema
const dealsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "partners", // Assuming there's an 'items' model
    required: true,
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming there's a 'farmers' model
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming there's a 'farmers' model
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

// Create the Deals model
const DealsModel = mongoose.model("Deals", dealsSchema);

// Export the Deals model
export default DealsModel;
