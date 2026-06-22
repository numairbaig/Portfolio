import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors());
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Database connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => {
    console.error('==================================================');
    console.error('WARNING: Could not connect to MongoDB database.');
    console.error('Make sure MongoDB is running or configure MONGODB_URI in .env');
    console.error('The backend will run, but database API endpoints will return errors.');
    console.error('Error details:', err.message);
    console.error('==================================================');
  });

// Routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});
