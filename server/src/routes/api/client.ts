import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Clients } from '../../models/clientModel.js';
import { PasswordChange } from '../../models/passwordChange.js';

const router = Router();

// POST / - Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        const newClient = req.body;

        const existingClient = await Clients.findOne({
            where: { email: newClient.email },
        });

        if (existingClient) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        newClient.password = await bcrypt.hash(req.body.password, 10);

        const clientData = await Clients.create(newClient);
        const clientDataJson = clientData.toJSON();

        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(clientDataJson, secretKey, { expiresIn: '1h' });
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json(error);
    }
});

// PUT / :id - Update user by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.id, 10);
        const updateData = req.body;

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedClient = await Clients.findByPk(clientId);

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const clientData = await updatedClient.update(updateData);
        const clientDataJson = clientData.toJSON();

        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(clientDataJson, secretKey, { expiresIn: '1h' });
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json(error);
    }
});

// PUT /change-password - Change user password
router.put('/change-password', async (req: Request, res: Response) => {
    try {
        const { clientId, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const passwordChange = await PasswordChange.create({
            clientId,
            password: hashedPassword,
        });

        res.status(200).json(passwordChange);
    } catch (error) {
        res.status(400).json(error);
    }
});

export { router as clientRoutes };