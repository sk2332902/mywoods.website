const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();

const woodRoutes = require('./routes/woods');
const contactRoutes = require('./routes/contact');
const Wood = require('./models/Wood');
const { seedWoods } = require('./scripts/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow requests from CLIENT_URL
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Allow any localhost origin (regardless of port) for robust local development
    const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
    
    // Check if origin is in allowedOrigins, is localhost, or matches deployed Render site patterns
    const isAllowed = isLocalhost || allowedOrigins.indexOf(origin) !== -1 || origin.includes('render.com');
    if (isAllowed) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/woods', woodRoutes);
app.use('/api/contact', contactRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'MyWoods Backend API is running successfully' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Auto-seed and start server function
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mywoods';
    console.log('Connecting to MongoDB database at:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    // Auto-seeding check
    const woodCount = await Wood.countDocuments();
    if (woodCount === 0) {
      console.log('No wood entries found. Auto-seeding the database with initial records...');
      await Wood.insertMany(seedWoods);
      console.log(`Successfully seeded ${seedWoods.length} wood entries.`);
    } else {
      console.log(`Database already has ${woodCount} wood entries. Skipping auto-seed.`);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
