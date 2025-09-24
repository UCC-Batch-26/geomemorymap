import express from 'express';
import { register } from '#modules/controllers/auth-register-controller.js';

const router = express.Router();

router.post('/register', register);

export default router;