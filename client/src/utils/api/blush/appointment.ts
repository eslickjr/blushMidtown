import AppointmentI from '../../../types/appointment';

const createAppointment = async (appointment: AppointmentI): Promise<AppointmentI> => {
    try {
        const response = await fetch('/api/appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Create the appointment
        const appointmentData = await response.json();
        return appointmentData;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

const getAppointment = async (appointmentId: number): Promise<AppointmentI> => {
    try {
        const response = await fetch(`/api/appointment/${appointmentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the appointment
        const appointmentData = await response.json();
        return appointmentData;
    } catch (error) {
        console.error('Error retrieving appointment:', error);
        throw error;
    }
}

const getAppointmentsByClientId = async (clientId: number): Promise<AppointmentI[]> => {
    try {
        const response = await fetch(`/api/appointment/client/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the appointments
        const appointmentsData = await response.json();
        return appointmentsData;
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        throw error;
    }
}

const updateAppointment = async (appointmentId: number, appointment: AppointmentI): Promise<AppointmentI> => {
    try {
        const response = await fetch(`/api/appointment/${appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update the appointment
        const updatedAppointmentData = await response.json();
        return updatedAppointmentData;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}

const deleteAppointment = async (appointmentId: number) => {
    try {
        const response = await fetch(`/api/appointment/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Successfully deleted the appointment
        return { message: 'Appointment deleted successfully' };
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

export { createAppointment, getAppointment, getAppointmentsByClientId, updateAppointment, deleteAppointment };