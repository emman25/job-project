import mongoose from 'mongoose';
import validator from "validator";

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  workType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkType',
    required: true
  },
  tags: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  minSalary: {
    type: Number,
    required: true,
  },
  maxSalary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.minSalary;
      },
      message: 'Max salary must be greater than min salary',
    },
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
