import express from 'express';
const router = express.Router();

import {
  getUserById,
  updateUser,
  deleteUser,
  getSavedJobs,
  saveJob,
  unsaveJob,
  uploadCV
} from '../controllers/user_controller';

router.get('/users', getUserById);
router.put('/users', updateUser);
router.delete('/users', deleteUser);
router.get('/users/saved-jobs', getSavedJobs);
router.post('/users/saved-jobs/:jobId', saveJob);
router.delete('/users/saved-jobs/:jobId', unsaveJob);


export default router;
