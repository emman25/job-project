import express from 'express';
const router = express.Router();

import { createJob, getJobsById, updateJob, deleteJob, getAllJobs } from '../controllers/job_controller';

router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobsById);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;
