import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/Db.js';

import foodRoute from './routes/FoodRoutes.js';
import userRoute from './routes/UserRoutes.js';
import cartroute from './routes/cartRoutes.js';
import orderroute from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;



const allowedOrigins = [
  "https://fooddelivery-app-frontend-ax6p.onrender.com/",
  "https://fooddelivery-app-admin-f9cx.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

connectDB();

app.use('/api/food', foodRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartroute);
app.use('/api/order', orderroute);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  '/images',
  express.static(path.join(__dirname, 'uploads'))
);

app.get('/ping', (req, res) => {
  res.send("pong");
});

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});