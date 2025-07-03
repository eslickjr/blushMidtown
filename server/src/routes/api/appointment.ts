import { Router } from 'express';
import type { Request, Response } from 'express';
import { Appointments } from '../../models/appointmentModel.js';
import { Clients } from '../../models/clientModel.js';
import { ServiceTypes } from '../../models/serviceTypeModel.js';
import { Services } from '../../models/serviceModel.js';
import { Stylists } from '../../models/stylistModel.js';
import { AddServices } from '../../models/addServiceModel.js';

const router = Router();

// POST / - Create a new appointment
router.post('/', async (req: Request, res: Response) => {
    try {
        const { newAppointment, addServiceIds } = req.body;

        // Validate required fields
        if (!newAppointment.clientId || !newAppointment.startTime || !newAppointment.endTime) {
            return res.status(400).json({ message: 'Client ID, start time, and end time are required.' });
        }

        // Check if client exists
        const client = await Clients.findByPk(newAppointment.clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found.' });
        }

        // Check if service type exists
        if (newAppointment.serviceTypeId) {
            const serviceType = await ServiceTypes.findByPk(newAppointment.serviceTypeId);
            if (!serviceType) {
                return res.status(404).json({ message: 'Service type not found.' });
            }
        }

        // Check if service exists
        if (newAppointment.serviceId) {
            const service = await Services.findByPk(newAppointment.serviceId);
            if (!service) {
                return res.status(404).json({ message: 'Service not found.' });
            }
        }

        // Check if stylist exists
        if (newAppointment.stylistId) {
            const stylist = await Stylists.findByPk(newAppointment.stylistId);
            if (!stylist) {
                return res.status(404).json({ message: 'Stylist not found.' });
            }
        }

        // Create the appointment
        const appointmentData = await Appointments.create(newAppointment);

        if (addServiceIds && addServiceIds.length > 0) {
            await appointmentData.setAddServices(addServiceIds);
        }

        const result = await Appointments.findByPk(appointmentData.id, {
            include: [ AddServices ],
        });
        res.status(201).json(appointmentData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET / :appointmentId - Get appointment by ID
router.get('/:appointmentId', async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.appointmentId, 10);
        const appointment = await Appointments.findByPk(appointmentId, {
            include: [
                { model: Clients, as: 'client' },
                { model: ServiceTypes, as: 'serviceType' },
                { model: Services, as: 'service' },
                { model: Stylists, as: 'stylist' },
            ],
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Get /client:clientId - Get all appointments for a client
router.get('/client/:clientId', async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.clientId, 10);
        const appointments = await Appointments.findAll({
            where: { clientId },
            include: [
                { model: Clients, as: 'client' },
                { model: ServiceTypes, as: 'serviceType' },
                { model: Services, as: 'service' },
                { model: Stylists, as: 'stylist' },
            ],
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this client.' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// PUT / :appointmentId - Update appointment by ID
router.put('/:appointmentId', async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.appointmentId, 10);
        const updateData = req.body;

        // Validate required fields
        if (!updateData.clientId || !updateData.startTime || !updateData.endTime) {
            return res.status(400).json({ message: 'Client ID, start time, and end time are required.' });
        }

        // Check if appointment exists
        const appointment = await Appointments.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Update the appointment
        await appointment.update(updateData);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// DELETE / :appointmentId - Delete appointment by ID
router.delete('/:appointmentId', async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.appointmentId, 10);
        const appointment = await Appointments.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        await appointment.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

export { router as appointmentRoutes };