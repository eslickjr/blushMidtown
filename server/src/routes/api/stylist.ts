import { Router } from 'express';
import type { Request, Response } from 'express';
import { Stylists } from '../../models/stylistModel.js';
import { Appointments } from '../../models/appointmentModel.js';
import { PricingLevels } from '../../models/pricingLevelModel.js';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, getDaysInMonth, isSameMonth, setHours, setMinutes, addMinutes, isBefore, isAfter } from 'date-fns';

const router = Router();

// GET / - Get all stylists
router.get('/', async (req: Request, res: Response) => {
    try {
        const stylists = await Stylists.findAll({
            include: [
                {
                    model: PricingLevels,
                    as: 'pricingLevels',
                    attributes: ['id', 'name', 'price'],
                },
            ],
        });
        res.status(200).json(stylists);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// GET /available-stylist?duration=30
router.get('/availability/stylist', async (req: Request, res: Response) => {
    try {
        const { Op } = require('sequelize');
        const duration = parseInt(req.query.duration as string, 10) || 30;

        if (isNaN(duration) || duration <= 0) {
            return res.status(400).json({ message: 'Invalid duration parameter.' });
        }

        const now = new Date();
        const durationMs = duration * 60 * 1000;

        // 1. Get all stylists
        const stylists = await Stylists.findAll();

        for (const stylist of stylists) {
            // 2. Get this stylist's upcoming appointments
            const appointments = await Appointments.findAll({
                where: {
                    stylistId: stylist.id,
                    endTime: { [Op.gte]: now },
                },
                order: [['startTime', 'ASC']],
            });

            // 3. Look for a gap big enough for the duration
            let lastEnd = now;

            let foundSlot = false;
            for (const appt of appointments) {
                const gap = new Date(appt.startTime).getTime() - lastEnd.getTime();
                if (gap >= durationMs) {
                    foundSlot = true;
                    break;
                }
                lastEnd = new Date(appt.endTime);
            }

            // 4. If there's space after last appointment or between now and first
            if (foundSlot || appointments.length === 0) {
                return res.json({
                    stylist,
                    availableStart: lastEnd,
                    availableEnd: new Date(lastEnd.getTime() + durationMs)
                });
            }
        }

        // No available stylist found
        return res.status(404).json({ message: 'No available stylist found.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error finding available stylist.' });
    }
});

// GET /availability/monthly - Get monthly availability for a stylist
router.get('/availability/monthly', async (req: Request, res: Response) => {
    try {
        const duration = parseInt(req.query.duration as string, 10);
        const stylistId = parseInt(req.query.stylistId as string, 10);
        const monthParam = req.query.month as string; // format: YYYY-MM

        if (!duration || duration <= 0 || !stylistId || !monthParam) {
            return res.status(400).json({ message: 'Invalid parameters.' });
        }

        const [year, month] = monthParam.split('-').map(Number);
        const now = new Date();
        const daysInMonth = getDaysInMonth(new Date(year, month - 1));
        const availableDays: boolean[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const checkDate = new Date(year, month - 1, day);

            // Skip past days if this is the current month
            if (isSameMonth(now, checkDate) && checkDate < now) {
                availableDays.push(false);
                continue;
            }

            const dayStart = setHours(setMinutes(new Date(year, month - 1, day), 0), 9);  // 9:00 AM
            const dayEnd = setHours(setMinutes(new Date(year, month - 1, day), 0), 18);   // 6:00 PM
            const durationMs = duration * 60 * 1000;

            // Get all appointments for this stylist on that day
            const appointments = await Appointments.findAll({
                where: {
                    stylistId,
                    startTime: { [Op.gte]: dayStart },
                    endTime: { [Op.lte]: dayEnd },
                },
                order: [['startTime', 'ASC']]
            });

            let lastEnd = dayStart;
            let hasAvailability = false;

            for (const appt of appointments) {
                const apptStart = new Date(appt.startTime);
                const gap = apptStart.getTime() - lastEnd.getTime();
                if (gap >= durationMs) {
                    hasAvailability = true;
                    break;
                }
                lastEnd = new Date(appt.endTime);
            }

            // Check the gap between last appointment and end of day
            if (!hasAvailability && (dayEnd.getTime() - lastEnd.getTime() >= durationMs)) {
                hasAvailability = true;
            }

            availableDays.push(hasAvailability);
        }

        return res.json({ availableDays });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error checking availability.' });
    }
});

// GET /availability/day - Get stylist availability for a specific day
router.get('/availability/daily', async (req: Request, res: Response) => {
    try {
        const { date, stylistId, duration } = req.query;

        if (!date || !stylistId || !duration) {
            return res.status(400).json({ message: 'Missing required parameters.' });
        }

        const stylistIdNum = parseInt(stylistId as string, 10);
        const durationMin = parseInt(duration as string, 10);
        const durationMs = durationMin * 60 * 1000;

        const day = new Date(date as string);
        const dayStart = setHours(setMinutes(new Date(day), 0), 9); // 09:00 AM
        const dayEnd = setHours(setMinutes(new Date(day), 0), 18);  // 06:00 PM

        // Get stylist appointments for that day
        const appointments = await Appointments.findAll({
            where: {
                stylistId: stylistIdNum,
                startTime: { [Op.lt]: dayEnd },
                endTime: { [Op.gt]: dayStart },
            },
            order: [['startTime', 'ASC']],
        });

        const availableSlots: { start: Date; end: Date }[] = [];
        let pointer = dayStart;

        for (const appt of appointments) {
            const apptStart = new Date(appt.startTime);
            const apptEnd = new Date(appt.endTime);

            // Check for free time before this appointment
            while (isBefore(addMinutes(pointer, durationMin), apptStart)) {
                const slotEnd = addMinutes(pointer, durationMin);
                if (isAfter(slotEnd, apptStart)) break;

                availableSlots.push({ start: new Date(pointer), end: slotEnd });
                pointer = addMinutes(pointer, durationMin);
            }

            // Move pointer past this appointment
            pointer = apptEnd > pointer ? apptEnd : pointer;
        }

        // Check for free time after last appointment until day end
        while (isBefore(addMinutes(pointer, durationMin), dayEnd) || addMinutes(pointer, durationMin).getTime() === dayEnd.getTime()) {
            const slotEnd = addMinutes(pointer, durationMin);
            if (isAfter(slotEnd, dayEnd)) break;

            availableSlots.push({ start: new Date(pointer), end: slotEnd });
            pointer = addMinutes(pointer, durationMin);
        }

        return res.json({ availableSlots });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error checking daily availability.' });
    }
});

// GET /availability/rolling - Get rolling availability for a stylist
router.get('/availability/rolling', async (req: Request, res: Response) => {
    try {
        const stylistId = parseInt(req.query.stylistId as string, 10);
        const duration = parseInt(req.query.duration as string, 10);
        const gap = parseInt(req.query.gap as string, 10);
        const amount = parseInt(req.query.amount as string, 10);

        if (!stylistId || !duration || !gap || !amount) {
            return res.status(400).json({ message: 'Missing required parameters.' });
        }

        const availableSlots: { start: Date; end: Date }[] = [];
        let pointer = new Date(); // Start from now

        while (availableSlots.length < amount) {
            const pointerDayStart = startOfDay(pointer);
            const pointerDayEnd = endOfDay(pointer);

            const dayStart = setHours(setMinutes(pointerDayStart, 0), 9);
            const dayEnd = setHours(setMinutes(pointerDayStart, 0), 18);

            // Skip if pointer is already past business hours
            if (isAfter(pointer, dayEnd)) {
                pointer = addMinutes(pointerDayStart, 24 * 60); // Move to next day
                continue;
            }

            const slotStart = new Date(pointer);
            const slotEnd = addMinutes(slotStart, duration);

            if (isAfter(slotEnd, dayEnd)) {
                pointer = addMinutes(pointerDayStart, 24 * 60); // Next day
                continue;
            }

            // Get all appointments for the stylist on that day
            const appointments = await Appointments.findAll({
                where: {
                    stylistId,
                    startTime: { [Op.lt]: slotEnd },
                    endTime: { [Op.gt]: slotStart },
                },
            });

            // If there's no overlap, add it as available
            if (appointments.length === 0) {
                availableSlots.push({ start: slotStart, end: slotEnd });
            }

            // Move pointer forward by gap
            pointer = addMinutes(pointer, gap);
        }

        return res.json({ availableSlots });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error checking rolling availability.' });
    }
});

export { router as stylistRoutes };