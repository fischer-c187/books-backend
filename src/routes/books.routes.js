import express from 'express';
import BooksController from '../controllers/books.controllers.js';
import { uploadToCloudinary } from '../middlewares/cloudinary.js';
import { multerUpload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/', BooksController.listBooks);
router.get('/:book', BooksController.getBookByName);
router.post(
  '/',
  multerUpload.single('image'),
  uploadToCloudinary,
  BooksController.addBooks
);
router.delete('/:id', BooksController.deleteBooks);
router.put(
  '/:id',
  multerUpload.single('image'),
  uploadToCloudinary,
  BooksController.updateBooks
);

export default router;
