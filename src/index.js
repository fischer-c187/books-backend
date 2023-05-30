import 'dotenv/config';

import express from 'express';
import router from './routes/books.routes.js';
import { pageNotFound, errorHandling } from './middlewares/error.js';

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/books', router)

app.use('/images', express.static('Public/uploads/images'))

app.use(pageNotFound)

app.use(errorHandling);

app.listen(port, () => {
  console.log('server listening on port ', port)
})