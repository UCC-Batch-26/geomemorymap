import express from 'express';
import { validateLogin } from '#modules/common/middleware/validateLoginMiddleware.js';
import { login } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', validateLogin, login);

export default router;
