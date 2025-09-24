import express from 'express';
import { register } from '#modules/controllers/auth-register-controller.js';
import { validateRegister } from '#modules/common/middleware/validate-register-middleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);

export default router;
