import {Router} from 'express'
import path from "path"
const router = Router()
import AddEquipmentController from '../../controllers/partner/AddEquipmentController.js' 
import GetEquipments from '../../controllers/partner/GetEquipments.js'
import GetEquipmentsByID from '../../controllers/partner/GetEquipmentsByID.js'
import { fileURLToPath } from 'url';
import multer from 'multer';
import ChangeEquipmentStatus from '../../controllers/partner/ChangeEquipmentStatus.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// Set the upload folder
const uploadFolder = path.join(currentDir, '../../Upload'); // Adjust the path as needed

// Set storage engine
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, callback) {
    callback(null, "IMG" + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.route('/change-status').put(ChangeEquipmentStatus)
router.route('/create-equipment').post(upload.single('file'),AddEquipmentController)
router.route('/get-equipments/all').get(GetEquipments);
router.route('/get-equipments/by-id/:id').get(GetEquipmentsByID);

export default router