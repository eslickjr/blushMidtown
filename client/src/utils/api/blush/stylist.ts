const getAllStylists = async () => {
    try {
        const response = await fetch(`/api/stylist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving stylists:', error);
        throw error;
    }
}

const getAvailableStylist = async (duration: number) => {
    try {
        const params = new URLSearchParams({
            duration: duration.toString(),
        });

        const response = await fetch(`/api/stylist/availability/stylist?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving available stylists:', error);
        throw error;
    }
}

const getAvailabilityMonthly = async (stylistId: number, month: string, duration: number) => {
    try {
        const params = new URLSearchParams({
            month: month,
            duration: duration.toString(),
            stylistId: stylistId.toString(),
        });

        const response = await fetch(`/api/stylist/availability/monthly?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving stylist availability for the month:', error);
        throw error;
    }
}

const getAvailabilityDaily = async (stylistId: number, date: string, duration: number) => {
    try {
        const params = new URLSearchParams({
            date: date,
            duration: duration.toString(),
            stylistId: stylistId.toString(),
        });

        const response = await fetch(`/api/stylist/availability/daily?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving stylist availability for the day:', error);
        throw error;
    }
}

const getAvailabilityRolling = async (stylistId: number, duration: number, gap: number, amount: number) => {
    try {
        const params = new URLSearchParams({
            stylistId: stylistId.toString(),
            duration: duration.toString(),
            gap: gap.toString(),
            amount: amount.toString(),
        });

        const response = await fetch(`/api/stylist/availability/rolling?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving rolling availability:', error);
        throw error;
    }
}

export { getAllStylists, getAvailableStylist, getAvailabilityMonthly, getAvailabilityDaily, getAvailabilityRolling };