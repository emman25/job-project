import express from 'express';
import { body } from 'express-validator';
import { registerUser, verifyEmail, loginUser } from '../controllers/auth_controller';

const router = express.Router();

router.post('/auth/register', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please provide a valid email').isEmail(),
  body('location', 'Please provide a valid location').not().isEmpty()
], registerUser);

router.get('/auth/verify', verifyEmail);

router.post('/auth/login', [
  body('email', 'Please provide a valid email').isEmail(),
  body('password', 'Password is required').exists(),
], loginUser);

export default router;
