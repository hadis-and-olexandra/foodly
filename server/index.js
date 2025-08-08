import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); // Load .env variables
import authRoutes from './routes/authRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json());

// Sample test route
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});
app.use('/api/auth', authRoutes);
//
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

//// Import food routes
import foodRoutes from './routes/foodRoutes.js';
app.use('/api/foods', foodRoutes);

// Import order routes
import orderRoutes from './routes/orderRoutes.js';
app.use('/api/orders', orderRoutes);

// import comment routes
import commentRoutes from './routes/commentRoutes.js';
app.use('/api/comments', commentRoutes);




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

