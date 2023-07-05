import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  }
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);

export default Location;
