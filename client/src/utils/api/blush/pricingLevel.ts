const getServicePrice = async (serviceId: number, pricingLevelId: number) => {
    try {
        const response = await fetch(`api/pricing/${serviceId}/${pricingLevelId}`, {
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

const getAddServicePrices = async (addServiceIds: number[], pricingLevelId: number) => {
    try {
        const params = new URLSearchParams({
            addServiceIds: addServiceIds.join(','),
            pricingLevelId: pricingLevelId.toString(),
        });

        const response = await fetch(`api/pricing/add?${params.toString()}`, {
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
        console.error('Error retrieving add service prices:', error);
        throw error;
    }
}

export { getServicePrice, getAddServicePrices };