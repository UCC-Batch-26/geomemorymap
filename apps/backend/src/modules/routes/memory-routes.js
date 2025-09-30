import { authMiddleware } from '#modules/common/middleware/auth-create-Middleware.js';
import { validateMemory } from '#modules/common/middleware/memory-middleware.js';
import { createMemory } from '#modules/controllers/memory/create-memory.js';
import { deleteMemory } from '#modules/controllers/memory/delete-memory.js';
import { getMemories } from '#modules/controllers/memory/get-memories.js';
import { getMemoryById } from '#modules/controllers/memory/get-memory-id.js';
import { updateMemory } from '#modules/controllers/memory/update-memory.js';
import { Router } from 'express';
import upload from '#modules/common/middleware/multer.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  upload.single('image'), // handles picture upload 
  validateMemory,
  createMemory,
);

/*router.post(
  '/upload-photo',
  authMiddleware,
  upload.single('image'), // handles picture upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      // Cloudinary URL
      const photoURL = req.file.path;

      res.status(201).json({ success: true, photoURL });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
*/
router.get('/', authMiddleware, getMemories);
router.get('/:id', authMiddleware, getMemoryById);
router.put('/:id', authMiddleware, validateMemory, updateMemory);
router.delete('/:id', authMiddleware, deleteMemory);

export default router;
