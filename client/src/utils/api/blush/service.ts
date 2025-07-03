const getServicesByServiceTypeId = async (serviceTypeId: number) => {
    try {
        const response = await fetch(`/api/service/${serviceTypeId}`, {
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
        console.error('Error retrieving service price:', error);
        throw error;
    }
}

const getServicesFirstTime = async () => {
    try {
        const response = await fetch(`/api/service/firstTime`, {
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
        console.error('Error retrieving first time services:', error);
        throw error;
    }
}

export { getServicesByServiceTypeId, getServicesFirstTime };