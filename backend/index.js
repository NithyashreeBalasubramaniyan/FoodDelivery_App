
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { connectDB } from './config/Db.js';

import foodRoute from './routes/FoodRoutes.js';
import userRoute from './routes/UserRoutes.js';
import cartroute from './routes/cartRoutes.js';
import orderroute from './routes/orderRoutes.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Resolve paths relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed frontend origins
const allowedOrigins = [
  'https://food-delivery-app-front-ax6p.onrender.com',
  'https://fooddelivery-app-admin-f9cx.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without an Origin (e.g. Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
}));

// Middleware
app.use(express.json());

// Static uploaded images
app.use(
  '/images',
  express.static(path.join(__dirname, 'uploads'))
);

// Routes
app.use('/api/food', foodRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartroute);
app.use('/api/order', orderroute);

// Health check
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Root route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();