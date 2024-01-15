import moment from "moment";
import Partner from "../../models/PartnerModel.js";
import { UserModel } from "../../models/UserModel.js";

const GetEquipments = async (req, res) => {
  try {
    const result = await Partner.find().populate({
      path: "partnerId",
      model: UserModel,
      select: "name", // You can select specific fields from UserModel
    });

    // Get the current date
    const currentDate = new Date().toISOString();

    const availableEquipments = result.map((equipment) => {
      let sum = 0;
      equipment.unavailableDates = equipment.unavailableDates.filter((dateRange) => {
        // console.log(new Date(dateRange.endDate).toISOString())
        if (new Date(dateRange.endDate).toISOString() < currentDate) {
          sum += parseInt(dateRange.qty);
          return false;
        }
        return true;
      });
      equipment.availableQuantity = parseInt(equipment.availableQuantity) + sum;

      return equipment;
    });
    console.log(availableEquipments);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetEquipments;
