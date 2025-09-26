import { createMiddleware } from '#modules/common/middleware/auth-create-Middleware.js';
import { createMemory } from '#modules/controllers/memory-controller.js';
import { Router } from 'express';


const router = Router();

router.post('/memory', createMiddleware, createMemory );

export default router;