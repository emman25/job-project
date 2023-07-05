import express from 'express';
import { createJobApplication } from '../controllers/jobapplication_controller';

const router = express.Router();

router.post('/jobapplication', createJobApplication);

export default router;
