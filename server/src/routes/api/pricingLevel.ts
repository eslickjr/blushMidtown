import { Router } from 'express';
import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { PricingLevels } from '../../models/pricingLevelModel.js';
import { PricingService } from '../../models/pricingServiceModel.js';
import { PricingAddService } from '../../models/pricingAddServiceModel.js';

const router = Router();

// GET / - Get pricing of service by serviceId and pricingLevelId
router.get('/:serviceId/:pricingLevelId', async (req: Request, res: Response) => {
    try {
        const serviceId = parseInt(req.params.serviceId, 10);
        const pricingLevelId = parseInt(req.params.pricingLevelId, 10);

        if (isNaN(serviceId) || isNaN(pricingLevelId)) {
            return res.status(400).json({ message: 'Invalid serviceId or pricingLevelId' });
        }

        const pricing = await PricingService.findOne({
            where: { serviceId, pricingLevelId },
            include: [
                {
                    model: PricingLevels,
                    attributes: ['id', 'name', 'description'], // Include only necessary fields
                },
            ],
        });

        if (!pricing) {
            return res.status(404).json({ message: 'Pricing not found for this service and pricing level.' });
        }

        return res.status(200).json(pricing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

//GET /add/?addServiceId&pricingLevelId - Get pricing of add service by a list of addServiceIds and pricingLevelId
router.get('/add', async (req: Request, res: Response) => {
    try {
        const addServiceIds = (req.query.addServiceIds as string)
            ?.split(',')
            .map((id) => parseInt(id, 10))
            .filter((id) => !isNaN(id));
        
        const pricingLevelId = parseInt(req.query.pricingLevelId as string, 10);

        if (!addServiceIds || addServiceIds.length === 0 || isNaN(pricingLevelId)) {
            return res.status(400).json({ message: 'Invalid addServiceIds or pricingLevelId' });
        }

        const pricing = await PricingAddService.findAll({
            where: {
                addServiceId: { [Op.in]: addServiceIds },
                pricingLevelId,
            },
            include: [
                {
                    model: PricingLevels,
                    attributes: ['id', 'name', 'description'],
                },
            ],
        });

        if (pricing.length === 0) {
            return res.status(404).json({ message: 'No pricing found for these add services and pricing level.' });
        }

        return res.status(200).json(pricing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

export { router as pricingLevelRoutes };