import booksModel from '../models/books.model.js';
import { HttpStatusCodes } from '../utils/httpStatusCodes.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_PASSWORD,
});

class BooksController {
  async listBooks(req, res, next) {
    try {
      const listBooks = await booksModel.listBooks();
      res.send(listBooks);
    } catch (error) {
      next(error);
    }
  }

  async getBookByName(req, res, next) {
    try {
      const bookName = req.params.book;
      const query = await booksModel.getBookByName(bookName);
      res.send(query);
    } catch (error) {
      next(error);
    }
  }

  async addBooks(req, res, next) {
    try {
      const newBooks = { ...req.body, image: req.locals.url };
      const bookId = await booksModel.addBooks(newBooks);
      res.status(HttpStatusCodes.CREATED).send(bookId);
    } catch (error) {
      next(error);
    }
  }

  async updateBooks(req, res, next) {
    try {
      const book = { ...req.body, _id: req.params.id };
      if (req.file) {
        book.image = req.locals.url;
      }
      await booksModel.updateBooks(book);
      res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteBooks(req, res, next) {
    try {
      await booksModel.deleteBooks(req.params.id);
      res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();
