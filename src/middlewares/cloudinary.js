import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryError, DatabaseError } from '../utils/customErrors.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_PASSWORD,
});

async function imageExist(name) {
  try {
    const res = await cloudinary.api.resources_by_ids([`books/${name}`]);
    return res.resources.length ? res.resources[0].secure_url : '';
  } catch (error) {
    throw error;
  }
}

export async function uploadToCloudinary(req, res, next) {
  try {
    if (!req.file) {
      req.locals = {
        url: 'https://res.cloudinary.com/dqdete3uv/image/upload/v1685107613/default-thesis-abstract_o45ysb.png',
      };
      return next();
    }
    const filename = req.file.originalname.split('.').slice(0, -1).join('.');
    const url = await imageExist(filename);
    req.locals = {
      url: url ? url
        : (
            await cloudinary.uploader.upload(req.file.path, {
              folder: 'books',
              public_id: filename,
            })
          ).secure_url
    };
    next();
  } catch (error) {
    if('error' in error) {
      next(new CloudinaryError(error.error.message, error.error.http_code))
    }
    next(new DatabaseError(error))
  }
}
