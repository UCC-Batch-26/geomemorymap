import { authMiddleware } from '#modules/common/middleware/auth-create-Middleware.js';
import { validateMemory } from '#modules/common/middleware/memory-middleware.js';
import { createMemory } from '#modules/controllers/memory/create-memory.js';
import { deleteMemory } from '#modules/controllers/memory/delete-memory.js';
import { getMemories } from '#modules/controllers/memory/get-memories.js';
import { getMemoryById } from '#modules/controllers/memory/get-memory-id.js';
import { updateMemory } from '#modules/controllers/memory/update-memory.js';
import { Router } from 'express';

const router = Router();

router.post('/', authMiddleware, validateMemory, createMemory);
router.get('/', authMiddleware, getMemories);
router.get('/:id', authMiddleware, getMemoryById);
router.put('/:id', authMiddleware, validateMemory, updateMemory);
router.delete('/:id', authMiddleware, deleteMemory);

export default router;

