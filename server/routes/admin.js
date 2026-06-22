import express from 'express';
import jwt from 'jsonwebtoken';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';

const router = express.Router();

// Middleware to verify JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretportfoliojwtkey12345', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied: Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Apply auth middleware to all routes in this router
router.use(authenticateToken);

/* ── MESSAGES MANAGEMENT ── */

// Get all messages sorted by date descending
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// Delete a message
router.delete('/messages/:id', async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

/* ── PROJECTS CRUD ── */

// Create project
router.post('/projects', async (req, res) => {
  try {
    const { title, tags, category, description, link, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const newProject = await Project.create({ title, tags, category, description, link, order });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const { title, tags, category, description, link, order } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, tags, category, description, link, order },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

/* ── EXPERIENCE CRUD ── */

// Create experience
router.post('/experiences', async (req, res) => {
  try {
    const { companyId, period, company, role, teamInfo, location, description, achievements, order } = req.body;
    if (!companyId || !company || !role || !description) {
      return res.status(400).json({ message: 'companyId, company, role, and description are required' });
    }
    const newExp = await Experience.create({
      companyId, period, company, role, teamInfo, location, description, achievements, order
    });
    res.status(201).json(newExp);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
});

// Update experience
router.put('/experiences/:id', async (req, res) => {
  try {
    const { companyId, period, company, role, teamInfo, location, description, achievements, order } = req.body;
    const updatedExp = await Experience.findByIdAndUpdate(
      req.params.id,
      { companyId, period, company, role, teamInfo, location, description, achievements, order },
      { new: true, runValidators: true }
    );
    if (!updatedExp) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(updatedExp);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
});

// Delete experience
router.delete('/experiences/:id', async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
});

export default router;
