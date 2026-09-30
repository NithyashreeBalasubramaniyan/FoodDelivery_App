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
  "https://food-delivery-app-front-ax6p.onrender.com",
  "https://fooddelivery-app-admin-f9cx.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

connectDB();

app.use('/api/food', foodRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartroute);
app.use('/api/order', orderroute);

app.use('/images', express.static('uploads'));

app.get('/ping', (req, res) => {
  res.send("pong");
});

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});