import express from 'express';
const router = express.Router();

import { getAlltag, createTag, updateTag, deleteTag } from '../controllers/tag_controller';


router.get('/tags', getAlltag);
router.post('/tags', createTag);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

export default router;
