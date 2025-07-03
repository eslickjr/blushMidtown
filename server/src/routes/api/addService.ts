import { Router } from 'express';
import type { Request, Response } from 'express';
import { AddServices } from '../../models/addServiceModel.js';
import { AddServiceMatch } from '../../models/addServiceMatchModel.js';

const router = Router();

// GET / - Get all additional services
router.get('/', async (req: Request, res: Response) => {
    try {
        const addServices = await AddServices.findAll({
            include: [
                {
                    model: AddServiceMatch,
                    attributes: ['matchId'], // Include only necessary fields
                },
            ],
        });

        if (addServices.length === 0) {
            return res.status(404).json({ message: 'No additional services found.' });
        }

        return res.status(200).json(addServices);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

// // GET /:addServiceId - Get additional service by addServiceId and include matched service Ids
// router.get('/:addServiceId', async (req: Request, res: Response) => {
//     try {
//         const addServiceId = parseInt(req.params.addServiceId, 10);

//         if (isNaN(addServiceId)) {
//             return res.status(400).json({ message: 'Invalid addServiceId' });
//         }

//         const addService = await AddServices.findOne({
//             where: { id: addServiceId },
//             include: [
//                 {
//                     model: AddServiceMatch,
//                     attributes: ['matchId'], // Include only necessary fields
//                 },
//             ],
//         });

//         if (!addService) {
//             return res.status(404).json({ message: 'Additional service not found.' });
//         }

//         return res.status(200).json(addService);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error', error });
//     }
// });

export { router as addServiceRoutes };