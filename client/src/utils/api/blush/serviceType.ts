const getAllServiceTypes = async () => {
    try {
        const response = await fetch(`/api/serviceType`, {
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

export { getAllServiceTypes };