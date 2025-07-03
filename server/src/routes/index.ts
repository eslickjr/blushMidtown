import { Router } from 'express';
import { securityRoutes } from './security.js';
import { apiRoutes } from './api/index.js';

const router = Router();

router.use('/auth', securityRoutes);
router.use('/api', apiRoutes);

export { router as routes };