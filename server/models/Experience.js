import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
    unique: true,
  },
  period: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  teamInfo: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  achievements: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
