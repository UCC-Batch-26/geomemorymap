import { Router } from 'express';
import { addSample } from './controllers/add-sample.js';
import { getAllSamples } from './controllers/get-all-samples.js';
import { getSample } from './controllers/get-sample.js';
import { validateLogin } from '#modules/common/middleware/loginMiddleware.js';
import { login } from './controllers/loginController.js';


const router = new Router();

router.post('/', addSample);
router.get('/', getAllSamples);
router.get('/:id', getSample);
routes.post('/login', validateLogin, login);

export default router;
