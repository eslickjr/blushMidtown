import { Router } from 'express';
import type { Request, Response } from 'express';
import { Services } from '../../models/serviceModel.js';
import { ServiceTypes} from '../../models/serviceTypeModel.js';

const router = Router();

// GET /:serviceTypeId - Get all services by service Type Id
router.get('/:serviceTypeId', async (req: Request, res: Response) => {
    try {
        const serviceTypeId = parseInt(req.params.serviceTypeId, 10);

        if (isNaN(serviceTypeId)) {
            return res.status(400).json({ message: 'Invalid serviceTypeId' });
        }

        const services = await Services.findAll({
            include: [
                {
                    model: ServiceTypes,
                    where: { id: serviceTypeId },
                    through: { attributes: [] }, // Clean response
                    attributes: [], // Omit ServiceType fields entirely
                },
            ],
        });

        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found for this service type.' });
        }

        return res.status(200).json(services);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET /firstTime - Get first time services
router.get('/firstTime', async (req: Request, res: Response) => {
    try {
        const services = await Services.findAll({
            where: { firstTime: true },
            attributes: {
                exclude: ['firstTime']
            }
        });

        if (services.length === 0) {
            return res.status(404).json({ message: 'No first time services found.' });
        }

        return res.status(200).json(services);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

export { router as serviceRoutes };