import express from 'express';
import {
  getAllLocations,
  createLocation,
  deleteLocation,
  updateLocation,
} from '../controllers/location_controller';

const router = express.Router();

router.get('/location', getAllLocations);
router.post('/location', createLocation);
router.delete('/location/:id', deleteLocation);
router.put('/location/:id', updateLocation);

export default router;
