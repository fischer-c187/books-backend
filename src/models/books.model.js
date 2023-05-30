import mongoose from 'mongoose';
import {
  NotFoundError,
  DatabaseError,
  ValidationError,
  ConnectDatabaseError,
} from '../utils/customErrors.js';

const Schema = mongoose.Schema;

class BooksModel {
  booksShema = new Schema({
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      default: 'unknow',
    },
    issueNumber: {
      type: Number,
      default: -1,
    },
    seriesName: {
      type: String,
      default: '',
    },
    isInCollection: {
      type: Boolean,
      default: false,
    },
    isSpecialIssue: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dqdete3uv/image/upload/v1685107613/default-thesis-abstract_o45ysb.png',
    },
    publicationDate: {
      type: Date,
      default: new Date(),
    },
  });

  book = mongoose.model('test', this.booksShema, 'test');

  constructor() {
    try {
      mongoose.connect(process.env.CONNECTION);
    } catch (error) {
      throw new ConnectDatabaseError(error);
    }
  }

  async listBooks() {
    try {
      const books = await this.book.find().exec();
      return books;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getBookByName(bookName) {
    try {
      const books = await this.book.where('title').equals(bookName).exec();

      if (!books.length) {
        throw new NotFoundError(`book : '${bookName}'`);
      }

      return books;
    } catch (error) {
      throw error instanceof NotFoundError ? error : new DatabaseError(error);
    }
  }

  async addBooks(newBooks) {
    try {
      const newModelBooks = new this.book(newBooks);
      const newBook = await newModelBooks.save();
      return newBook._id;
    } catch (error) {
      throw error instanceof mongoose.Error.ValidatorError
        ? new ValidationError(error)
        : new DatabaseError(error);
    }
  }

  async updateBooks(books) {
    try {
      const updatedBook = await this.book.findByIdAndUpdate(books._id, books, {
        runValidators: true,
      });

      if (!updatedBook) {
        throw new NotFoundError(books._id);
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidatorError) {
        throw new ValidationError(error);
      } else if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new DatabaseError(error);
      }
    }
  }

  async deleteBooks(booksId) {
    try {
      const deletedBook = await this.book.findByIdAndDelete(booksId);
      if (!deletedBook) {
        throw new NotFoundError(booksId);
      }
    } catch (error) {
      throw error instanceof NotFoundError ? error : new DatabaseError(error);
    }
  }
}

export default new BooksModel();
