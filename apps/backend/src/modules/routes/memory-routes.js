import { createMemory } from '#modules/controllers/memory/create-memory.js';
import { deleteMemory } from '#modules/controllers/memory/delete-memory.js';
import { getMemories } from '#modules/controllers/memory/get-memories.js';
import { getMemoryById } from '#modules/controllers/memory/get-memory-id.js';
import { updateMemory } from '#modules/controllers/memory/update-memory.js';
import { Router } from 'express';

const router = Router();

router.post('/', authMiddleware, createMemory);
router.get('/', authMiddleware, getMemories);
router.get('/:id', authMiddleware, getMemoryById);
router.put('/:id', authMiddleware, updateMemory);
router.put('/:id', authMiddleware, deleteMemory);

export default router;

