import express from 'express';
import { validateLogin } from '#modules/common/middleware/validate-login-middleware.js';
import { login } from '../controllers/login-controller.js';

const router = express.Router();

router.post('/login', validateLogin, login);

export default router;
