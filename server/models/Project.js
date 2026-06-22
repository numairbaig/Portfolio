import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  category: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
