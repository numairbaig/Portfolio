import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Admin from '../models/Admin.js';
import Message from '../models/Message.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const initialProjects = [
  {
    title: 'PDF Prism — PDF Viewer App in Kotlin',
    tags: ['Kotlin', 'Android SDK', 'PDFium', 'Material Design 3'],
    category: 'FEATURED',
    description: 'A lightweight, secure, and blazing-fast Android PDF viewer app built using Kotlin. Features hardware-accelerated rendering, dark mode page styling, custom bookmarks, and offline processing with zero trackers.',
    link: '#',
    order: 1
  },
  {
    title: 'UI Vault — Premium UI Elements & Templates',
    tags: ['React', 'CSS Modules', 'Vite', 'A11y'],
    category: 'NORMAL',
    description: 'A curated repository of premium, highly interactive, and accessible UI components built using HSL color systems, glassmorphism, and responsive CSS. Features smooth micro-animations.',
    link: 'https://ui-vault-hub.vercel.app/',
    order: 2
  },
  {
    title: 'Guest House Management — PMS Solution',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    category: 'NORMAL',
    description: 'A complete Property Management System (PMS) for guest houses. Features real-time room booking grids, billing automation, dashboard reporting, and role-based access control.',
    link: '#',
    order: 3
  },
  {
    title: 'UI Live Sandbox — Real-time Component Editor',
    tags: ['React', 'Monaco Editor', 'Iframe Sandbox', 'Vite'],
    category: 'NORMAL',
    description: 'An interactive, web-based playground for writing and previewing React and CSS components in real time. Features live hot-reloading in an isolated iframe sandbox.',
    link: 'https://ui-live-sandbox.vercel.app/',
    order: 4
  },
  {
    title: 'Aura Thread — Clothing E-Commerce Website',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    category: 'NORMAL',
    description: 'A modern clothing e-commerce store with full cart functionality, Stripe checkout integrations, inventory management systems, and a custom dashboard reporting analytics.',
    link: '#',
    order: 5
  }
];

const initialExperiences = [
  {
    companyId: 'tintash',
    period: '2023 — Present',
    company: 'Tintash',
    role: 'Senior Software Engineer',
    teamInfo: 'Team: 6 · Web Apps Team',
    location: 'Lahore, PK',
    description: 'Developing responsive, high-performance web applications and multiplayer game backend panels for international startup clients.',
    achievements: [
      'Optimized game dashboard telemetry processing, cutting database read times by 30%',
      'Architected serverless AWS Lambdas handling 50k+ daily API queries',
      'Mentored 3 junior developers and established agile scrum guidelines',
      'Implemented end-to-end unit test suites improving test coverage to 85%'
    ],
    order: 1
  },
  {
    companyId: 'rolustech',
    period: '2021 — 2023',
    company: 'Rolustech',
    role: 'Software Engineer',
    teamInfo: 'Team: 8 · CRM Customizations Team',
    location: 'Lahore, PK',
    description: 'Customized SugarCRM and Salesforce systems, building custom API sync pipelines for global B2B clients.',
    achievements: [
      'Developed SugarCRM API sync script moving 100k+ customer contacts daily',
      'Built customizable reporting charts using React and ChartJS for business analytics',
      'Configured OAuth2 SSO integrations across multiple client portals',
      'Reduced CRM data sync latency by 20% using bulk-upsert techniques'
    ],
    order: 2
  },
  {
    companyId: 'redbuffer',
    period: '2019 — 2021',
    company: 'RedBuffer',
    role: 'Full-Stack Developer',
    teamInfo: 'Team: 5 · Web Products',
    location: 'Lahore, PK',
    description: 'Created user dashboards, backend nodes, and API wrappers for AI-driven analytics applications.',
    achievements: [
      'Built and launched web-app dashboard for predictive maintenance product',
      'Connected Node.js gateways to Python microservices via clean REST endpoints',
      'Integrated Stripe checkout and billing models for subscription management',
      'Created responsive admin layouts using modern flexbox/grid alignments'
    ],
    order: 3
  },
  {
    companyId: 'codegator',
    period: '2017 — 2019',
    company: 'Codegator',
    role: 'Associate Developer',
    teamInfo: 'Team: 4 · PHP/Node Team',
    location: 'Lahore, PK',
    description: 'Assisted in designing backend scripts, database seeding tools, and styling frontend dashboards.',
    achievements: [
      'Developed and optimized MySQL tables, indexing key query paths for client search',
      'Authored responsive CSS modules matching client Figma layouts precisely',
      'Created automation scripts parsing Excel spreadsheet items to JSON collections',
      'Tested and debugged legacy codebases, resolving 50+ bug tickets'
    ],
    order: 4
  }
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Message.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing collections.');

    // Seed projects
    await Project.insertMany(initialProjects);
    console.log('Seeded projects.');

    // Seed experiences
    await Experience.insertMany(initialExperiences);
    console.log('Seeded experiences.');

    // Seed admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('NumairBaig7744$', salt);
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });
    console.log('Seeded default admin user (admin / NumairBaig7744$).');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

seed();
