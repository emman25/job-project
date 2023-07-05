import mongoose from 'mongoose';

const workTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
}, { timestamps: true });

const WorkType = mongoose.model('WorkType', workTypeSchema);

export default WorkType;
