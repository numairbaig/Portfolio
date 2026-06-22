import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';
import Admin from '../models/Admin.js';

const router = express.Router();

// Get all projects sorted by display order
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
});

// Get all experiences sorted by display order
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving experiences', error: error.message });
  }
});

// Submit a message through the contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('==================================================');
      console.log('📬 OFFLINE CONTACT INQUIRY RECEIVED:');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || '(No Subject)'}`);
      console.log(`Message: ${message}`);
      console.log('==================================================');
      
      return res.status(202).json({ 
        message: 'Message received and logged to server console (offline mode)', 
        offline: true 
      });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.warn('MongoDB connection failed during contact save. Logging message to console:');
    console.log('==================================================');
    console.log('📬 OFFLINE CONTACT INQUIRY RECEIVED:');
    console.log(`From: ${req.body.name} <${req.body.email}>`);
    console.log(`Subject: ${req.body.subject || '(No Subject)'}`);
    console.log(`Message: ${req.body.message}`);
    console.log('==================================================');
    
    res.status(202).json({ 
      message: 'Message received (database connection timeout, logged to console)', 
      offline: true 
    });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'supersecretportfoliojwtkey12345',
      { expiresIn: '24h' }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});

export default router;
