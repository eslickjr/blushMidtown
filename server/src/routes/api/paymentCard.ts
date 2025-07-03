import { Router } from 'express';
import type { Request, Response } from 'express';
import { PaymentCards } from '../../models/paymentCardModel.js';
import { Clients } from '../../models/clientModel.js';
import { Op } from 'sequelize';

const router = Router();

// POST / - Create a new appointment
router.post('/', async (req: Request, res: Response) => {
    try {
        const newPaymentCard = req.body;

        // Validate required fields
        if (!newPaymentCard.clientId || !newPaymentCard.cardHolderName || !newPaymentCard.cardNumber || !newPaymentCard.expiryDate || !newPaymentCard.zipCode) {
            return res.status(400).json({ message: 'Client ID, card number, and expiry date are required.' });
        }

        // Check if client exists
        const client = await Clients.findByPk(newPaymentCard.clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found.' });
        }

        // Create the payment card
        const paymentCardData = await PaymentCards.create(newPaymentCard);

        // If card is created successfully and isPrimary is true, update other cards to not be primary
        if (newPaymentCard.isPrimary) {
            await PaymentCards.update(
                { isPrimary: false },
                {
                    where: {
                        clientId: newPaymentCard.clientId,
                        id: { [Op.ne]: paymentCardData.id } // Exclude the newly created card
                    }
                }
            );
        }

        // Return the created payment card data
        res.status(201).json(paymentCardData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET /:cardId - Get payment card by ID
router.get('/:cardId', async (req: Request, res: Response) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const paymentCard = await PaymentCards.findByPk(cardId);

        if (!paymentCard) {
            return res.status(404).json({ message: 'Payment card not found.' });
        }

        res.status(200).json(paymentCard);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET /client/:clientId - Get all payment cards for a client
router.get('/client/:clientId', async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.clientId, 10);
        const paymentCards = await PaymentCards.findAll({
            where: { clientId },
            order: [['createdAt', 'DESC']] // Order by creation date
        });

        if (paymentCards.length === 0) {
            return res.status(404).json({ message: 'No payment cards found for this client.' });
        }

        res.status(200).json(paymentCards);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// PUT /:cardId - Update payment card by ID
router.put('/:cardId', async (req: Request, res: Response) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const updateData = req.body;

        // Validate required fields
        if (!updateData.clientId || !updateData.cardNumber || !updateData.expiryDate || !updateData.zipCode) {
            return res.status(400).json({ message: 'Client ID, card number, and expiry date are required.' });
        }

        // Check if payment card exists
        const paymentCard = await PaymentCards.findByPk(cardId);
        if (!paymentCard) {
            return res.status(404).json({ message: 'Payment card not found.' });
        }

        // Update the payment card
        await paymentCard.update(updateData);

        // If isPrimary is true, update other cards to not be primary
        if (updateData.isPrimary) {
            await PaymentCards.update(
                { isPrimary: false },
                {
                    where: {
                        clientId: updateData.clientId,
                        id: { [Op.ne]: paymentCard.id } // Exclude the updated card
                    }
                }
            );
        }

        res.status(200).json(paymentCard);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// DELETE /:cardId - Delete payment card by ID
router.delete('/:cardId', async (req: Request, res: Response) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const paymentCard = await PaymentCards.findByPk(cardId);

        if (!paymentCard) {
            return res.status(404).json({ message: 'Payment card not found.' });
        }

        // Delete the payment card
        await paymentCard.destroy();
        res.status(204).send(); // No content to return
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

export { router as paymentCardRoutes };