import { createMiddleware } from '#modules/common/middleware/create-memory-middleware.js';
import { createMemory } from '#modules/controllers/memory-controller.js';
import express from 'express';

const router = express.Router();

router.post('/memory', createMiddleware, createMemory);

export default router;