import { Router } from 'express';
import type { Request, Response } from 'express';
import { ServiceTypes } from '../../models/serviceTypeModel.js';

const router = Router();

// GET / - Get all service types
router.get('/', async (req: Request, res: Response) => {
    try {
        const serviceTypes = await ServiceTypes.findAll();
        res.status(200).json(serviceTypes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

export { router as serviceTypeRoutes };