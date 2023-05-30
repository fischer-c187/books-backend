import multer from "multer";
import { MulterError } from "../utils/customErrors.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/uploads/images'); // Chemin vers votre dossier de téléchargement
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname );
  }
});

function filterMimeType(req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname.toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  return mimetype && extname ? cb(null, true) : cb(new MulterError('Only .png, .jpg and .jpeg format allowed!'));
}

export const multerUpload = multer({ storage: storage, fileFilter: filterMimeType });