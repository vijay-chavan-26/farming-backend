import {Router} from 'express'
import path from "path"
const router = Router()
import AddEquipmentController from '../../controllers/partner/AddEquipmentController.js' 
import { fileURLToPath } from 'url';
import multer from 'multer';

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

router.route('/create-equipment').post(upload.single('file'),AddEquipmentController)
// router.route('/get-equipments').get()

export default router