import { validateContactMiddleware } from '#modules/common/middleware/validate-contact-middleware.js';
import { contactController } from '#modules/controllers/contact-controller.js';
import express from 'express';


const router = express.Router();

router.post('/', validateContactMiddleware, contactController);

export default router;