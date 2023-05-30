import { HttpStatusCodes } from "../utils/httpStatusCodes.js";

export function pageNotFound (req, res, next) {
  res.status(HttpStatusCodes.NOT_FOUND).send("<h1>Page not found on the server</h1>")
}

export function errorHandling(err, req, res, next) {
  res
    .status(err.statusCode || HttpStatusCodes.INTERNAL_SERVER)
    .send({ message: err.message });
}