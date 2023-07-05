import express from 'express';
const router = express.Router();

import { getAllWorkTypes, createWorkType, updateWorkType, deleteWorkType } from '../controllers/worktype_controller';


router.get('/work-types', getAllWorkTypes);
router.post('/work-types', createWorkType);
router.put('/work-types/:id', updateWorkType);
router.delete('/work-types/:id', deleteWorkType);

export default router;
