import cors from 'cors';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connect } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { productsRouter } from './routes/productRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { uploadRouter } from './routes/uploadRoutes.js';

const __dirname = path.resolve();
const NODE_ENV = process.env.NODE_ENV || 'production';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/uploads', uploadRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);

if (NODE_ENV === 'production') {
  console.log('Production mode');
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    console.log(path.join(__dirname, './uploads'));
    console.log('Getting files');
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is started on port ${PORT}`);
});
