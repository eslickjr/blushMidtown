import { Router, Request, Response } from 'express';
import { Clients } from '../models/clientModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    const client = await Clients.findOne({
        where: { email },
    });

    if (!client) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, client.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const clientId = client.id;
    const firstName = client.firstName;
    const lastName = client.lastName;
    const phone = client.phone;
    const emailOptIn = client.emailOptIn;
    const clientData = { clientId, firstName, lastName, email, phone, emailOptIn };

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign(clientData, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};

const router = Router();

router.post('/login', login);

export { router as securityRoutes };