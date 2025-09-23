import express from 'express';
import { validateLogin } from '#modules/common/middleware/loginMiddleware.js';
import { login } from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', validateLogin, login);

export default router;